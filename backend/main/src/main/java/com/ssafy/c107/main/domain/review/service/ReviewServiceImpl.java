package com.ssafy.c107.main.domain.review.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.c107.main.common.aws.FileService;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.food.exception.FoodNotFoundException;
import com.ssafy.c107.main.domain.food.repository.FoodRepository;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.order.entity.OrderList;
import com.ssafy.c107.main.domain.order.repository.OrderListRepository;
import com.ssafy.c107.main.domain.review.dto.FoodReviewDto;
import com.ssafy.c107.main.domain.review.dto.ReviewDto;
import com.ssafy.c107.main.domain.review.dto.TextInput;
import com.ssafy.c107.main.domain.review.dto.request.CreateReviewInfoRequest;
import com.ssafy.c107.main.domain.review.dto.response.FastApiResponse;
import com.ssafy.c107.main.domain.review.dto.response.FoodDetailResponse;
import com.ssafy.c107.main.domain.review.dto.response.ReviewInfoResponse;
import com.ssafy.c107.main.domain.review.dto.response.StoreReviewResponse;
import com.ssafy.c107.main.domain.review.entity.Review;
import com.ssafy.c107.main.domain.review.exception.*;
import com.ssafy.c107.main.domain.review.repository.ReviewRepository;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import com.vane.badwordfiltering.BadWordFiltering;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Slf4j
@Service
@EnableAsync
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final FoodRepository foodRepository;
    private final OrderListRepository orderListRepository;
    private final FileService fileService;
    private final ChatClient chatClient;
    private final StoreRepository storeRepository;

    @Value("${sangmoo.data.url}")
    private String fastApiUrl;

    @Async
    public CompletableFuture<Double> analyzeSentimentWithKoBERT(String comment) {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 요청 JSON 데이터 생성
            String requestJson = objectMapper.writeValueAsString(new TextInput(comment));
            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

            // FastAPI로 POST 요청 보내기
            ResponseEntity<String> response = restTemplate.exchange(
                    fastApiUrl + "/predict", HttpMethod.POST, entity, String.class);
            log.info("FastAPI 응답 내용: {}", response.getBody());

            if (response.getStatusCode().is2xxSuccessful()) {
                FastApiResponse fastApiResponse = objectMapper.readValue(response.getBody(), FastApiResponse.class);
                Double positiveRate = fastApiResponse.getProbabilities().get("positive");
                log.info("FastAPI에서 추출된 긍정 비율: {}", positiveRate);
                return CompletableFuture.completedFuture(positiveRate);
            } else {
                throw new FastApiCommunicationException();
            }
        } catch (Exception e) {
            log.error("FastAPI 감정 분석 중 오류 발생: {}", e.getMessage(), e);
            throw new FastApiCommunicationException();
        }
    }

    @Async
    public CompletableFuture<Double> analyzeSentimentWithOpenAI(String content) {
        try {
            log.info("OpenAI에 보낼 리뷰 내용: {}", content);
            String summary = chatClient
                    .prompt()
                    .system("당신의 반찬 리뷰에 대해서 감정 분석을해 긍정과 부정의 확률을 제공해주는 역할입니다." +
                            "다음은 반찬을 시켜먹는 사람들이 쓴 리뷰입니다. " +
                            "이 리뷰를 감정 분석하여 긍정의 확률을 %로 제공해주세요 (예: 긍정:76.5%)")
                    .user(content)
                    .call()
                    .content();

            if (summary.isEmpty()) {
                throw new SummeryNotFoundException();
            }

            log.info("OpenAI로부터 받은 응답: {}", summary);
            Double openAiResult = extractPositiveRateFromSummary(summary);
            log.info("OpenAI에서 추출된 긍정 비율: {}", openAiResult);
            return CompletableFuture.completedFuture(openAiResult);
        } catch (Exception e) {
            log.error("OpenAI 감정 분석 중 오류 발생: {}", e.getMessage(), e);
            throw new SummeryNotFoundException();
        }
    }

    // 리뷰 작성
    @Transactional
    public void writeReview(Long orderListId, CreateReviewInfoRequest createReviewInfoRequest) {
        OrderList orderList = orderListRepository.findById(orderListId)
                .orElseThrow(InvalidOrderListException::new);

        String S3imageUrl = fileService.saveFile(createReviewInfoRequest.getImg());

        CompletableFuture<Double> kobertFuture = analyzeSentimentWithKoBERT(createReviewInfoRequest.getComment());
        CompletableFuture<Double> openAiFuture = analyzeSentimentWithOpenAI(createReviewInfoRequest.getComment());

        CompletableFuture<Void> combinedFuture = CompletableFuture.allOf(kobertFuture, openAiFuture);

        BadWordFiltering badWordFiltering = new BadWordFiltering();
        combinedFuture.thenRunAsync(() -> {
            try {
                double kobertResult = kobertFuture.get(); // KoBert의 긍정 확률
                double openAiResult = openAiFuture.get();

                double finalPositiveRate = (openAiResult * 0.7) + (kobertResult * 0.3);
                boolean emotion = finalPositiveRate >= 50.0;

                log.info("최종 긍정 확률: {}%", finalPositiveRate);
                String commentText = badWordFiltering.change(createReviewInfoRequest.getComment());
                Review review = Review.builder()
                        .orderList(orderList)
                        .comment(commentText)
                        .img(S3imageUrl)
                        .emotion(emotion)
                        .build();

                reviewRepository.save(review);
            } catch (ExecutionException | InterruptedException e) {
                log.error("리뷰 저장 중 오류 발생: {}", e.getMessage(), e);
                throw new ReviewAnalysisProcessingException(e);
            } catch (Exception e) {
                log.error("리뷰 저장 중 일반적인 오류 발생: {}", e.getMessage(), e);
                throw new ReviewAnalysisProcessingException();
            }
        });
    }

    // 매일 새벽 4시에 AI 요약 생성 및 저장
    @Scheduled(cron = "0 0 4 * * *")
    @Transactional
    public void updateDailyReviewSummary() {
        List<Store> stores = storeRepository.findAll();

        for (Store store : stores) {
            Long storeId = store.getId();

            // 해당 Store의 모든 리뷰 조회 (Fetch Join 사용 가능)
            List<Review> reviews = reviewRepository.findAllByStoreId(storeId);

            // 리뷰가 없으면 다음 Store로 이동
            if (reviews.isEmpty()) {
                continue;
            }

            // 리뷰 코멘트를 하나의 문자열로 결합
            String reviewContent = reviews.stream()
                    .map(Review::getComment)
                    .collect(Collectors.joining(" "));

            // AI를 통해 한 줄 요약 생성
            String summary = createSummaryWithAI(reviewContent);

            // Store 엔티티의 summary 필드에 업데이트하고 저장
            store.updateSummary(summary);

            // Store 엔티티 저장
            storeRepository.save(store);
        }
    }

    // 반찬가게 상세 페이지[구매자용](긍/부정, 한 줄 요약)
    @Transactional(readOnly = true)
    public ReviewInfoResponse getReviewInfo(Long storeId) {
        // 가게에 해당하는 모든 리뷰 조회
        List<Review> reviews = reviewRepository.findAllByStoreId(storeId);

        // 전체 리뷰 수, 긍정 리뷰 수, 부정 리뷰 수 계산
        long totalReviewCount = reviews.size();
        long positiveCount = reviews.stream().filter(Review::isEmotion).count();
        long negativeCount = totalReviewCount - positiveCount;

        // AI 요약 결과
        Store store = storeRepository.findById(storeId)
                .orElseThrow(SummeryNotFoundException::new);
        String summary = store.getSummary();

        // 응답 객체 생성
        ReviewInfoResponse reviewInfoResponse = new ReviewInfoResponse();
        reviewInfoResponse.setReviewCount(totalReviewCount);
        reviewInfoResponse.setPositiveCount(positiveCount);
        reviewInfoResponse.setNegativeCount(negativeCount);
        reviewInfoResponse.setSummary(summary);

        return reviewInfoResponse;
    }

    // 반찬가게 상세페이지[구매자용](반찬별 리뷰)
    @Transactional(readOnly = true)
    public StoreReviewResponse getStoreReviews(Long storeId) {
        // 가게와 관련된 리뷰 조회
        List<Review> reviews = reviewRepository.findReviewByStoreId(storeId);

        // 리뷰 리스트 Dto로 변환
        List<ReviewDto> reviewDtoList = reviews.stream()
                .map(review -> {
                    OrderList orderList = review.getOrderList();
                    Food food = orderList.getFood();
                    Member member = orderList.getOrder().getMember();

                    ReviewDto reviewDto = new ReviewDto();
                    reviewDto.setReviewId(review.getId());
                    reviewDto.setEmail(member.getEmail());
                    reviewDto.setFoodName(food.getName());
                    reviewDto.setImg(review.getImg());
                    reviewDto.setComment(review.getComment());

                    return reviewDto;
                }).collect(Collectors.toList());

        StoreReviewResponse storeReviewResponse = new StoreReviewResponse();
        storeReviewResponse.setReviews(reviewDtoList);
        return storeReviewResponse;
    }

    // 반찬 선택 리뷰
    @Transactional(readOnly = true)
    public FoodDetailResponse getFoodDetails(Long foodId) {
        // 반찬 정보 조회
        Food food = foodRepository.findById(foodId)
                .orElseThrow(FoodNotFoundException::new);

        // 반찬에 해당하는 리뷰 조회
        List<Review> reviews = reviewRepository.findAllByOrderList_Food_Id(foodId);

        // 리뷰 목록을 Dto로 변환
        List<FoodReviewDto> reviewDtos = reviews.stream()
                .map(review -> {
                    Member member = review.getOrderList().getOrder().getMember();

                    FoodReviewDto reviewDto = new FoodReviewDto();
                    reviewDto.setReviewId(review.getId());
                    reviewDto.setEmail(member.getEmail());
                    reviewDto.setFoodName(food.getName());
                    reviewDto.setImg(review.getImg());
                    reviewDto.setComment(review.getComment());
                    return reviewDto;
                }).collect(Collectors.toList());

        FoodDetailResponse foodDetailResponse = new FoodDetailResponse();
        foodDetailResponse.setFoodId(food.getId());
        foodDetailResponse.setFoodName(food.getName());
        foodDetailResponse.setFoodPrice(food.getPrice());
        foodDetailResponse.setFoodDescription(food.getDescription());
        foodDetailResponse.setFoodImg(food.getImg());
        foodDetailResponse.setReviews(reviewDtos);

        return foodDetailResponse;
    }

    // ChatModel을 사용해 요약 생성
    private String createSummaryWithAI(String content) {
        // ChatModel을 통해 AI 호출 및 요약 생성
        String summary = chatClient
                .prompt()
                .system("반찬을 시켜먹는 사람들이 쓴 리뷰 입니다. 이 리뷰들을 간단하게 한줄로 요약 해주세요")
                .user(content)
                .call()
                .content();
        if (summary.isEmpty()) {
            throw new SummeryNotFoundException();
        }
        return summary;
    }

    // OpenAI 응답에서 긍정 비율을 추출하는 메서드 예시
    private Double extractPositiveRateFromSummary(String summary) {
        // 예를 들어 summary가 "긍정 70%" 같은 형식이라면 숫자만 추출하는 로직
        String percentageString = summary.replaceAll("[^0-9]", "");
        return Double.parseDouble(percentageString);
    }
}
