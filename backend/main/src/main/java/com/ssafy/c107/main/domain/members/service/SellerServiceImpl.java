package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.common.entity.WeeklyFood;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.food.exception.FoodNotFoundException;
import com.ssafy.c107.main.domain.food.repository.FoodRepository;
import com.ssafy.c107.main.domain.members.dto.FoodDetail;
import com.ssafy.c107.main.domain.members.dto.FoodDetailDto;
import com.ssafy.c107.main.domain.members.dto.ProductDto;
import com.ssafy.c107.main.domain.members.dto.ReviewChart;
import com.ssafy.c107.main.domain.members.dto.ReviewDetail;
import com.ssafy.c107.main.domain.members.dto.SubscribeDetail;
import com.ssafy.c107.main.domain.members.dto.response.FoodListResponse;
import com.ssafy.c107.main.domain.members.dto.response.MonthlySalesResponse;
import com.ssafy.c107.main.domain.members.dto.response.NextWeekFood;
import com.ssafy.c107.main.domain.members.dto.response.NextWeekQuantityResponse;
import com.ssafy.c107.main.domain.members.dto.response.ReviewDetailResponse;
import com.ssafy.c107.main.domain.members.dto.response.SalesStatusResponse;
import com.ssafy.c107.main.domain.members.dto.response.SellerMenuResponse;
import com.ssafy.c107.main.domain.members.dto.response.SellerReviewAllResponse;
import com.ssafy.c107.main.domain.members.dto.response.TodaySalesResponse;
import com.ssafy.c107.main.domain.order.entity.Order;
import com.ssafy.c107.main.domain.order.entity.OrderList;
import com.ssafy.c107.main.domain.order.entity.OrderType;
import com.ssafy.c107.main.domain.order.repository.OrderListRepository;
import com.ssafy.c107.main.domain.order.repository.OrderRepository;
import com.ssafy.c107.main.domain.review.entity.Review;
import com.ssafy.c107.main.domain.review.exception.SummeryNotFoundException;
import com.ssafy.c107.main.domain.review.repository.ReviewRepository;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.exception.StoreNotFoundException;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import com.ssafy.c107.main.domain.subscribe.entity.Subscribe;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeWeek;
import com.ssafy.c107.main.domain.subscribe.exception.SubscribeWeekNotFoundException;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribePayRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribeRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribeWeekRepository;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final OrderRepository orderRepository;
    private final MemberSubscribeRepository memberSubscribeRepository;
    private final SubscribePayRepository subscribePayRepository;
    private final SubscribeRepository subscribeRepository;
    private final SubscribeWeekRepository subscribeWeekRepository;
    private final OrderListRepository orderListRepository;
    private final FoodRepository foodRepository;
    private final ReviewRepository reviewRepository;
    private final StoreRepository storeRepository;
    private final ChatClient chatClient;
    private final MemberValidator memberValidator;

    @Override
    public SalesStatusResponse getSalesStatus(Long storeId, Long userId) {
        memberValidator.validStoreAndMember(storeId, userId);

        //주문 거래금액 가져오기
        int todayOrderPrice = orderRepository.getTodayTotalPriceByStore(storeId);

        //구독 거래금액 가져오기
        int todaySubscribePrice = subscribePayRepository.findTodayTotalPaymentByStoreId(storeId);

        //주문 수량 가져오기
        int todayOrderCount = orderRepository.getTodayOrderCountByStore(storeId);

        //구독자 수 가져오기
        List<SubscribeStatus> statuses = Arrays.asList(SubscribeStatus.SUBSCRIBE,
            SubscribeStatus.CANCEL_SCHEDULE);
        int subscribeCount = memberSubscribeRepository.getSubscribeMembers(storeId, statuses);

        return SalesStatusResponse
            .builder()
            .todaySales(todayOrderPrice + todaySubscribePrice)
            .todayTradeCnt(todayOrderCount)
            .subscribePeopleCnt(subscribeCount)
            .build();
    }

    @Override
    public MonthlySalesResponse getMonthlySales(Long storeId, Long userId) {
        memberValidator.validStoreAndMember(storeId, userId);

        List<String> monthsData = List.of("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec");

        // 1. 해당 가게의 월별 금액 가져오기
        // 1-1. 개별 반찬 금액 가져오기
        LocalDateTime startDate = LocalDateTime.now().minusYears(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM", Locale.ENGLISH);
        List<Object[]> monthlySumForLastYear = orderRepository.findMonthlySumForLastYear(startDate,
            storeId);

        Map<String, Long> foodMap = new HashMap<>();

        for (Object[] result : monthlySumForLastYear) {
            YearMonth ym = YearMonth.parse((String) result[0]);
            String monthName = ym.format(formatter);
            Long total = ((Number) result[1]).longValue();

            foodMap.put(monthName, total);
        }

        // 1-2. 구독 금액 가져오기
        List<Object[]> monthlyRevenueByStoreId = subscribePayRepository.findMonthlyRevenueByStoreId(
            storeId);

        Map<String, Long> subscribeMap = new HashMap<>();

        for (Object[] result : monthlyRevenueByStoreId) {
            YearMonth ym = YearMonth.parse((String) result[0]);
            String monthName = ym.format(formatter);
            Long total = ((Number) result[1]).longValue();
            subscribeMap.put(monthName, total);
        }

        for (String mon : monthsData) {
            if (!foodMap.containsKey(mon)) {
                foodMap.put(mon, 0L);
            }
            if (!subscribeMap.containsKey(mon)) {
                subscribeMap.put(mon, 0L);
            }
        }

        return MonthlySalesResponse
            .builder()
            .foodSales(foodMap)
            .subscribeSales(subscribeMap)
            .build();
    }

    @Override
    public NextWeekQuantityResponse getNextCount(Long storeId, Long userId) {
        memberValidator.validStoreAndMember(storeId, userId);

        //초기 설정
        List<NextWeekFood> foodCnt = new ArrayList<>();

        //해당 가게의 구독 상품 조회
        List<Subscribe> subscribes = subscribeRepository.findAllByStore_Id(storeId);

        //구독 상품별 개수 구하기
        Map<Long, Integer> subscribeMap = new HashMap<>();
        List<SubscribeStatus> statuses = Arrays.asList(SubscribeStatus.SUBSCRIBE,
            SubscribeStatus.CANCEL_SCHEDULE);
        for (Subscribe subscribe : subscribes) {
            int cnt = memberSubscribeRepository.getCountSubscribes(subscribe.getId(),
                statuses);
            if (cnt == 0) {
                continue;
            }
            subscribeMap.put(subscribe.getId(), cnt);
        }

        //구독 상품의 반찬 가져오기
        for (Long subscribeId : subscribeMap.keySet()) {
            LocalDate nextMonday = getnextMonday();

            //다음주의 구독주차 가져오기
            SubscribeWeek nextWeek = subscribeWeekRepository.findNextWeek(subscribeId, nextMonday);

            SubscribeWeek subscribeWeek = subscribeWeekRepository.findBySwId(nextWeek.getId())
                .orElseThrow(SubscribeWeekNotFoundException::new);

            foodCnt.addAll(subscribeWeek.getWeeklyFoods()
                .stream()
                .map(WeeklyFood::getFood)
                .map(food -> NextWeekFood.builder()
                    .foodId(food.getId())
                    .foodName(food.getName())
                    .foodCnt(subscribeMap.get(subscribeId))
                    .build())
                .toList());
        }

        //최종에 넣기
        return NextWeekQuantityResponse
            .builder()
            .foods(foodCnt)
            .build();
    }

    @Override
    public TodaySalesResponse getTodaySales(Long storeId, Long userId) {
        memberValidator.validStoreAndMember(storeId, userId);

        //초기설정
        List<ProductDto> products = new ArrayList<>();

        //해당 가게의 오늘날짜의 구독 상품 주문 개수 가져오기
        List<Object[]> todaySubscribeSales = subscribeRepository.getTodaySubscribeSales(storeId);

        //해당 구독 상품의 가격과 총 가격 가져오기
        for (Object[] object : todaySubscribeSales) {
            products.add(ProductDto
                .builder()
                .price((int) object[1])
                .productCnt((int) object[0])
                .productName((String) object[2])
                .salesSum((int) object[0] * (int) object[1])
                .build());
        }

        //해당 가게의 오늘날짜의 일반 상품 주문 가져오기
        List<Order> orders = orderRepository.findByOrderTypeAndCreatedAtToday(OrderType.FOOD,
            storeId);

        //해당 주문의 상품을 돌면서 반찬의 가격 가져와서 개수 곱해가주고 넣기
        Map<String, Integer> map = new HashMap<>();
        for (Order order : orders) {
            List<OrderList> orderLists = orderListRepository.findAllByOrder_Id(order.getId());
            for (OrderList orderList : orderLists) {
                String foodName = orderList.getFood().getName();
                if (!map.containsKey(foodName)) {
                    map.put(foodName, orderList.getCount());
                } else {
                    map.put(foodName, map.get(foodName) + orderList.getCount());
                }
            }
        }

        for (String foodName : map.keySet()) {
            Food food = foodRepository.findByName(foodName).orElseThrow(FoodNotFoundException::new);
            products.add(ProductDto
                .builder()
                .productName(foodName)
                .productCnt(map.get(foodName))
                .price(food.getPrice())
                .salesSum(food.getPrice() * map.get(foodName))
                .build());
        }

        return TodaySalesResponse
            .builder()
            .products(products)
            .build();
    }

    @Override
    public SellerReviewAllResponse getAllReview(Long storeId, Long userId) {
        memberValidator.validStoreAndMember(storeId, userId);

        int positiveCnt = reviewRepository.getCount(storeId, true);
        int negativeCnt = reviewRepository.getCount(storeId, false);
        return SellerReviewAllResponse
            .builder()
            .storeId(storeId)
            .positiveCnt(positiveCnt)
            .negativeCnt(negativeCnt)
            .build();
    }

    @Override
    public ReviewDetailResponse getProductReview(Long storeId, Long foodId, Long userId) {
        memberValidator.validStoreAndMember(storeId, userId);

        //전체 상품일 때
        if (foodId == -1) {
            //차트 정보 가져오기
            int positiveCnt = reviewRepository.getCount(storeId, true);
            int negativeCnt = reviewRepository.getCount(storeId, false);
            Store store = storeRepository.findById(storeId)
                .orElseThrow(StoreNotFoundException::new);
            List<ReviewDetail> reviewDetails = new ArrayList<>();
            String aiSummery = store.getSummary();
            List<Review> reviews = reviewRepository.findReviewByStoreId(storeId);

            for (Review review : reviews) {
                String memberEmail = review.getOrderList().getOrder().getMember().getEmail();
                String foodName = review.getOrderList().getFood().getName();
                reviewDetails.add(ReviewDetail
                    .builder()
                    .img(review.getImg())
                    .comment(review.getComment())
                    .foodName(foodName)
                    .memberEmail(memberEmail)
                    .build());
            }
            return ReviewDetailResponse
                .builder()
                .reviews(reviewDetails)
                .chart(ReviewChart
                    .builder()
                    .positiveCnt(positiveCnt)
                    .negativeCnt(negativeCnt)
                    .aiSummary(aiSummery)
                    .build())
                .build();
        } else {
            //상품일 때
            //차트 정보 가져오기
            int positiveCnt = reviewRepository.getCountFood(storeId, true, foodId);
            int negativeCnt = reviewRepository.getCountFood(storeId, false, foodId);
            Food food = foodRepository.findById(foodId).orElseThrow(FoodNotFoundException::new);

            //리뷰 정보 가져오기
            List<ReviewDetail> reviewDetails = new ArrayList<>();
            String aiSummery = food.getSummary();
            List<Review> reviews = reviewRepository.findReviewByStoreIdAndFoodId(storeId, foodId);

            for (Review review : reviews) {
                String memberEmail = review.getOrderList().getOrder().getMember().getEmail();
                String foodName = review.getOrderList().getFood().getName();
                reviewDetails.add(ReviewDetail
                    .builder()
                    .img(review.getImg())
                    .foodName(foodName)
                    .comment(review.getComment())
                    .memberEmail(memberEmail)
                    .build());
            }
            return ReviewDetailResponse
                .builder()
                .reviews(reviewDetails)
                .chart(ReviewChart
                    .builder()
                    .positiveCnt(positiveCnt)
                    .negativeCnt(negativeCnt)
                    .aiSummary(aiSummery)
                    .build())
                .build();
        }
    }

    @Override
    public SellerMenuResponse getAllProduct(Long storeId) {
        //가게의 구독상품 가져오기
        List<SubscribeDetail> subscribes = new ArrayList<>();
        List<Subscribe> storeSubscribes = subscribeRepository.findAllByStore_Id(storeId);
        for (Subscribe subscribe : storeSubscribes) {
            subscribes.add(SubscribeDetail
                .builder()
                .subscribeId(subscribe.getId())
                .subscribeBeforePrice(subscribe.getBeforePrice())
                .subscribeDescription(subscribe.getDescription())
                .subscribeName(subscribe.getName())
                .subscribePrice(subscribe.getPrice())
                .build());
        }

        //가게의 개별 반찬 가져오기
        List<FoodDetail> foods = new ArrayList<>();
        List<Food> storeFoods = foodRepository.findAllByStore_Id(storeId);
        for (Food food : storeFoods) {
            foods.add(FoodDetail
                .builder()
                .foodId(food.getId())
                .foodDescription(food.getDescription())
                .foodImg(food.getImg())
                .foodPrice(food.getPrice())
                .foodName(food.getName())
                .build());
        }

        return SellerMenuResponse
            .builder()
            .subscribes(subscribes)
            .foods(foods)
            .build();
    }

    @Override
    public FoodListResponse getAllFood(Long storeId) {
        List<FoodDetailDto> foods = new ArrayList<>();
        foods.add(FoodDetailDto
            .builder()
            .foodId(-1L)
            .foodName("전체")
            .build());
        List<Food> foodList = foodRepository.findAllByStore_Id(storeId);
        for (Food food : foodList) {
            foods.add(FoodDetailDto
                .builder()
                .foodId(food.getId())
                .foodName(food.getName())
                .build());
        }
        return FoodListResponse
            .builder()
            .foods(foods)
            .build();
    }

    LocalDate getnextMonday() {
        LocalDate today = LocalDate.now();
        return today.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
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

    // 매주 월요일마다 모든 상품 리뷰 요약을 갱신하는 스케줄링 메소드
    @Scheduled(cron = "0 0 4 * * MON")
    @Transactional
    public void updateWeeklyReviewSummary() {
        List<Store> stores = storeRepository.findAll();

        for (Store store : stores) {
            Long storeId = store.getId();

            // 전체 상품의 리뷰 요약을 갱신
            updateWeeklyReviewSummaryForStore(storeId);

            // 각 상품별 리뷰 요약을 갱신
            List<Food> foods = foodRepository.findAllByStore_Id(storeId);
            for (Food food : foods) {
                updateWeeklyReviewSummaryForFood(storeId, food.getId());
            }
        }
    }

    // Store의 전체 리뷰 요약을 갱신하는 메소드
    private void updateWeeklyReviewSummaryForStore(Long storeId) {
        List<Review> reviews = reviewRepository.findReviewByStoreId(storeId);
        if (reviews.isEmpty()) {
            return;
        }

        // 리뷰 코멘트 결함
        String reviewContent = reviews.stream()
            .map(Review::getComment)
            .collect(Collectors.joining(" "));

        // AI 요약 생성
        String summary = createSummaryWithAI(reviewContent);

        // Store 엔티티의 summary 필드에 업데이트
        Store store = storeRepository.findById(storeId)
            .orElseThrow(StoreNotFoundException::new);
        store.updateSummary(summary);
        storeRepository.save(store);
    }

    // 각 Food별 리뷰 요약을 갱신하는 메소드
    private void updateWeeklyReviewSummaryForFood(Long storeId, Long foodId) {
        List<Review> reviews = reviewRepository.findReviewByStoreIdAndFoodId(storeId, foodId);
        if (reviews.isEmpty()) {
            return;
        }

        // 리뷰 코멘트 결합
        String reviewContent = reviews.stream()
            .map(Review::getComment)
            .collect(Collectors.joining(" "));

        // AI 요약 생성
        String summary = createSummaryWithAI(reviewContent);

        // Food 엔티티의 summary 필드에 업데이트
        Food food = foodRepository.findById(foodId)
            .orElseThrow(FoodNotFoundException::new);
        food.updateSummary(summary);
        foodRepository.save(food);
    }
}
