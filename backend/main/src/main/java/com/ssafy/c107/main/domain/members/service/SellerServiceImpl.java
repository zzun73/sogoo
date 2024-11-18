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
import com.ssafy.c107.main.domain.order.entity.DeliveryStatus;
import com.ssafy.c107.main.domain.order.entity.Order;
import com.ssafy.c107.main.domain.order.entity.OrderList;
import com.ssafy.c107.main.domain.order.entity.OrderType;
import com.ssafy.c107.main.domain.order.repository.OrderListRepository;
import com.ssafy.c107.main.domain.order.repository.OrderRepository;
import com.ssafy.c107.main.domain.review.dto.response.ReviewCountResponse;
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
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import java.util.TreeMap;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
        Long subscribeCountLong = memberSubscribeRepository.getSubscribeMembers(storeId, statuses);
        int subscribeCount =
            subscribeCountLong != null ? subscribeCountLong.intValue() : 0; // 안전하게 int로 변환

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
        Map<Long, Integer> subscribeMap = new TreeMap<>((o1, o2) -> o2.compareTo(o1));
        List<SubscribeStatus> statuses = Arrays.asList(SubscribeStatus.SUBSCRIBE,
            SubscribeStatus.CANCEL_SCHEDULE);
        for (Subscribe subscribe : subscribes) {
            int cnt = memberSubscribeRepository.getCountSubscribes(subscribe.getId(),
                statuses).intValue();
            if (cnt == 0) {
                continue;
            }
            subscribeMap.put(subscribe.getId(), cnt);
        }

        //구독 상품의 반찬 가져오기
        for (Long subscribeId : subscribeMap.keySet()) {
            LocalDate nextMonday = getnextMonday();

            //다음주의 구독주차 가져오기
            List<SubscribeWeek> nextWeek = subscribeWeekRepository.findNextWeek(subscribeId,
                nextMonday);

            if (nextWeek.isEmpty()) {
                throw new SubscribeWeekNotFoundException();
            }

            // 모든 구독 주차에 대해 필요한 반찬 계산
            for (SubscribeWeek subscribeWeek : nextWeek) {
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
            int productCount = ((Number) object[0]).intValue();
            Long productPrice = ((Number) object[1]).longValue();

            products.add(ProductDto
                .builder()
                .price(productPrice)
                .productCnt(productCount)
                .productName((String) object[2])
                .salesSum(productCount * productPrice.intValue())
                .build());
        }

        //해당 가게의 오늘날짜의 일반 상품 주문 가져오기
        List<Order> orders = orderRepository.findByOrderTypeAndCreatedAtToday(OrderType.FOOD,
            storeId);

        //해당 주문의 상품을 돌면서 반찬의 가격 가져와서 개수 곱해가주고 넣기
        Map<Long, Integer> map = new HashMap<>();
        for (Order order : orders) {
            List<OrderList> orderLists = orderListRepository.findAllByOrder_Id(order.getId());
            for (OrderList orderList : orderLists) {
                Long foodId = orderList.getFood().getId();
                if (!map.containsKey(foodId)) {
                    map.put(foodId, orderList.getCount());
                } else {
                    map.put(foodId, map.get(foodId) + orderList.getCount());
                }
            }
        }

        for (Long foodId : map.keySet()) {
            Food food = foodRepository.findById(foodId).orElseThrow(FoodNotFoundException::new);
            products.add(ProductDto
                .builder()
                .productName(food.getName())
                .productCnt(map.get(foodId))
                .price(Long.parseLong(String.valueOf(food.getPrice())))
                .salesSum(food.getPrice() * map.get(foodId))
                .build());
        }

        products.sort((o1, o2) -> o2.getSalesSum() - o1.getSalesSum());

        return TodaySalesResponse
            .builder()
            .products(products)
            .build();
    }

    @Override
    public SellerReviewAllResponse getAllReview(Long storeId, Long userId) {
        memberValidator.validStoreAndMember(storeId, userId);

        int positiveCnt = reviewRepository.getCount(storeId, true).intValue();
        int negativeCnt = reviewRepository.getCount(storeId, false).intValue();

        // 긍정률이 높은 음식 리뷰를 가져와서 음식 이름만 추출하고 중복 제거
        Pageable top5Pageable = PageRequest.of(0, 5);
        List<Review> positiveReviews = reviewRepository.findTop5PositiveReviewsByStoreId(storeId,
            top5Pageable);
        List<String> positiveFoodNames = positiveReviews.stream()
            .map(review -> review.getOrderList().getFood().getName())
            .distinct()
            .collect(Collectors.toList());

        // 중복 제거 후 5개 미만일 경우 추가로 가져와서 5개를 채우기
        if (positiveFoodNames.size() < 5) {
            List<Review> additionalReviews = reviewRepository.findTop5PositiveReviewsByStoreId(
                storeId, PageRequest.of(1, 5));
            List<String> additionalFoodNames = additionalReviews.stream()
                .map(review -> review.getOrderList().getFood().getName())
                .filter(name -> !positiveFoodNames.contains(name))
                .limit(5 - positiveFoodNames.size())
                .collect(Collectors.toList());
            positiveFoodNames.addAll(additionalFoodNames);
        }

        // 부정률이 높은 음식 리뷰를 가져와서 음식 이름만 추출하고 중복 제거
        List<Review> negativeReviews = reviewRepository.findTop5NegativeReviewsByStoreId(storeId,
            top5Pageable);
        List<String> negativeFoodNames = negativeReviews.stream()
            .map(review -> review.getOrderList().getFood().getName())
            .distinct()
            .collect(Collectors.toList());

        // 중복 제거 후 5개 미만일 경우 추가로 가져와서 5개를 채우기
        if (negativeFoodNames.size() < 5) {
            List<Review> additionalNegativeReviews = reviewRepository.findTop5NegativeReviewsByStoreId(
                storeId, PageRequest.of(1, 5));
            List<String> additionalNegativeFoodNames = additionalNegativeReviews.stream()
                .map(review -> review.getOrderList().getFood().getName())
                .filter(name -> !negativeFoodNames.contains(name))
                .limit(5 - negativeFoodNames.size())
                .collect(Collectors.toList());
            negativeFoodNames.addAll(additionalNegativeFoodNames);
        }

        return SellerReviewAllResponse.builder()
            .storeId(storeId)
            .positiveCnt(positiveCnt)
            .negativeCnt(negativeCnt)
            .positiveLankList(positiveFoodNames) // 긍정률이 높은 음식 이름 리스트 추가
            .negativeLankList(negativeFoodNames) // 부정률이 높은 음식 이름 리스트 추가
            .build();
    }

    @Override
    public ReviewDetailResponse getProductReview(Long storeId, Long foodId, Long userId, int page) {
        memberValidator.validStoreAndMember(storeId, userId);

        //전체 상품일 때
        if (foodId == -1) {
            //차트 정보 가져오기
            int positiveCnt = reviewRepository.getCount(storeId, true).intValue();
            int negativeCnt = reviewRepository.getCount(storeId, false).intValue();
            Store store = storeRepository.findById(storeId)
                .orElseThrow(StoreNotFoundException::new);
            List<ReviewDetail> reviewDetails = new ArrayList<>();
            String aiSummery = store.getSummary();

            Pageable pageable = PageRequest.of(page - 1, 20);
            List<Review> reviews = reviewRepository.findReviewByStoreId(storeId, pageable)
                .getContent();

            for (Review review : reviews) {
                String memberEmail = review.getOrderList().getOrder().getMember().getEmail();
                String foodName = review.getOrderList().getFood().getName();
                reviewDetails.add(ReviewDetail
                    .builder()
                    .img(review.getImg())
                    .comment(review.getComment())
                    .foodName(foodName)
                    .memberEmail(memberEmail)
                    .emotion(review.isEmotion())
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
            int positiveCnt = reviewRepository.getCountFood(storeId, true, foodId).intValue();
            int negativeCnt = reviewRepository.getCountFood(storeId, false, foodId).intValue();
            Food food = foodRepository.findById(foodId).orElseThrow(FoodNotFoundException::new);

            //리뷰 정보 가져오기
            List<ReviewDetail> reviewDetails = new ArrayList<>();
            String aiSummery = food.getSummary();

            Pageable pageable = PageRequest.of(page - 1, 20);
            List<Review> reviews = reviewRepository.findReviewByStoreIdAndFoodId(storeId, foodId,
                pageable).getContent();

            for (Review review : reviews) {
                String memberEmail = review.getOrderList().getOrder().getMember().getEmail();
                String foodName = review.getOrderList().getFood().getName();
                reviewDetails.add(ReviewDetail
                    .builder()
                    .img(review.getImg())
                    .foodName(foodName)
                    .comment(review.getComment())
                    .memberEmail(memberEmail)
                    .emotion(review.isEmotion())
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
    public SellerMenuResponse getAllProduct(Long storeId, Long userId) {
        memberValidator.validStoreAndMember(storeId, userId);

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
    public FoodListResponse getAllFood(Long storeId, Long userId) {
        memberValidator.validStoreAndMember(storeId, userId);

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

    @Override
    public ReviewCountResponse getProductReviewCount(Long storeId, Long userId, Long foodId) {
        memberValidator.validStoreAndMember(storeId, userId);

        //전체 상품 조회일 경우
        if (foodId == -1) {
            int cnt = reviewRepository.countByStoreId(storeId).intValue();
            return ReviewCountResponse
                .builder()
                .reviewCount(cnt)
                .build();

        } else {                //그 외
            int cnt = reviewRepository.getCountFood(foodId).intValue();
            return ReviewCountResponse
                .builder()
                .reviewCount(cnt)
                .build();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] downloadExcel(Long storeId, Long userId) throws IOException {
        memberValidator.validStoreAndMember(storeId, userId);

        //해당 가게의 배송 전 물품 가져오기
        List<Order> orders = orderRepository.findOrderWithDetailsForExcel(
            storeId, DeliveryStatus.BEFORE_DELIVERY);

        //엑셀에 적기
        byte[] excelBytes = createExcelBytes(orders);

        updateOrderStatus(orders);

        return excelBytes;
    }

    @Transactional
    public void updateOrderStatus(List<Order> orders) {
        for (Order order : orders) {
            order.deliverSuccess();
        }
    }

    private byte[] createExcelBytes(List<Order> orders) throws IOException {
        try (Workbook workbook = new XSSFWorkbook();
            ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("주문 목록");

            // 스타일 설정
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);

            // 헤더 생성
            Row headerRow = sheet.createRow(0);
            String[] headers = {"이메일", "주소", "주문 상품 목록", "총 주문금액"};

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            // 데이터 입력
            int rowNum = 1;
            for (Order order : orders) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(order.getMember().getName());
                row.createCell(1).setCellValue(order.getMember().getAddress());

                // OrderList는 이미 페치 조인으로 로딩되어 있어야 함
                String orderDetails = order.getOrderLists().stream()
                    .map(item -> String.format("%s (%d개)",
                        item.getFood().getName(),
                        item.getCount()))
                    .collect(Collectors.joining(", "));

                row.createCell(2).setCellValue(orderDetails);
                row.createCell(3).setCellValue(order.getPrice());
            }

            // 컬럼 너비 자동 조정
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(baos);
            return baos.toByteArray();
        }
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

    // ChatModel을 사용해 요약 생성
    private String createFeedBackWithAI(String content) {
        // ChatModel을 통해 AI 호출 및 요약 생성
        String summary = chatClient
            .prompt()
            .system("반찬을 시켜먹는 사람들이 쓴 리뷰 입니다. 이 리뷰들을 읽고 " +
                "전체적인 피드백을 간단하게 요약 해주세요 " +
                "(ex: 무슨 반찬이 너무 짜다 or 무슨 반찬이 양이 적다)")
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
        String summary = createFeedBackWithAI(reviewContent);

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
