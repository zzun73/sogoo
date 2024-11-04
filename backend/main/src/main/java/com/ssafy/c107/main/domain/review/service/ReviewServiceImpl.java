package com.ssafy.c107.main.domain.review.service;

import com.ssafy.c107.main.common.aws.FileService;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.food.exception.FoodNotFoundException;
import com.ssafy.c107.main.domain.food.repository.FoodRepository;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.order.entity.OrderList;
import com.ssafy.c107.main.domain.order.repository.OrderListRepository;
import com.ssafy.c107.main.domain.review.dto.FoodReviewDto;
import com.ssafy.c107.main.domain.review.dto.ReviewDto;
import com.ssafy.c107.main.domain.review.dto.request.CreateReviewInfoRequest;
import com.ssafy.c107.main.domain.review.dto.response.FoodDetailResponse;
import com.ssafy.c107.main.domain.review.dto.response.ReviewInfoResponse;
import com.ssafy.c107.main.domain.review.dto.response.StoreReviewResponse;
import com.ssafy.c107.main.domain.review.entity.Review;
import com.ssafy.c107.main.domain.review.exception.InvalidOrderListException;
import com.ssafy.c107.main.domain.review.exception.MaxUploadSizeExceededException;
import com.ssafy.c107.main.domain.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final FoodRepository foodRepository;
    private final OrderListRepository orderListRepository;
    private final FileService fileService;

    // 리뷰 작성
    @Override
    public void writeReview(Long orderListId, CreateReviewInfoRequest createReviewInfoRequest) {

        // 주문 항목 확인
        OrderList orderList = orderListRepository.findById(orderListId)
                .orElseThrow(InvalidOrderListException::new);

//        String S3imageUrl = fileService.saveFile(createReviewInfoRequest.getImg());
//
//        Review review = Review.builder()
//                .orderList(orderList)
//                .comment(createReviewInfoRequest.getComment())
//                .img(S3imageUrl)
//                .emotion(false)
//                .build();
//        reviewRepository.save(review);

        try {
            String S3imageUrl = fileService.saveFile(createReviewInfoRequest.getImg());
            Review review = Review.builder()
                    .orderList(orderList)
                    .comment(createReviewInfoRequest.getComment())
                    .img(S3imageUrl)
                    .emotion(false)
                    .build();
            reviewRepository.save(review);
        } catch (org.springframework.web.multipart.MaxUploadSizeExceededException e) {
            throw new MaxUploadSizeExceededException();
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

        // 한 줄 요약 (예시로 단순히 가장 최근 리뷰의 댓글을 가져와 사용) 나중에 추가 구현
        String summary = reviews.stream().findFirst()
                .map(Review::getComment)
                .orElse("리뷰가 없습니다.");

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
}
