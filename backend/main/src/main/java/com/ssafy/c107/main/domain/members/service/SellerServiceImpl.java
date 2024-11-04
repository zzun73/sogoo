package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.common.entity.WeeklyFood;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.food.exception.FoodNotFoundException;
import com.ssafy.c107.main.domain.food.repository.FoodRepository;
import com.ssafy.c107.main.domain.members.dto.ProductDto;
import com.ssafy.c107.main.domain.members.dto.response.MonthlySalesResponse;
import com.ssafy.c107.main.domain.members.dto.response.NextWeekFood;
import com.ssafy.c107.main.domain.members.dto.response.NextWeekQuantityResponse;
import com.ssafy.c107.main.domain.members.dto.response.SalesStatusResponse;
import com.ssafy.c107.main.domain.members.dto.response.SellerReviewAllResponse;
import com.ssafy.c107.main.domain.members.dto.response.TodaySalesResponse;
import com.ssafy.c107.main.domain.order.entity.Order;
import com.ssafy.c107.main.domain.order.entity.OrderList;
import com.ssafy.c107.main.domain.order.entity.OrderType;
import com.ssafy.c107.main.domain.order.exception.OrderListNotFoundException;
import com.ssafy.c107.main.domain.order.repository.OrderListRepository;
import com.ssafy.c107.main.domain.order.repository.OrderRepository;
import com.ssafy.c107.main.domain.review.repository.ReviewRepository;
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
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

    @Override
    public SalesStatusResponse getSalesStatus(Long storeId) {
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
    public MonthlySalesResponse getMonthlySales(Long storeId) {
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

        return MonthlySalesResponse
            .builder()
            .foodSales(foodMap)
            .subscribeSales(subscribeMap)
            .build();
    }

    @Override
    public NextWeekQuantityResponse getNextCount(Long storeId) {
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
    public TodaySalesResponse getTodaySales(Long storeId) {
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
    public SellerReviewAllResponse getAllReview(Long storeId) {
        int positiveCnt = reviewRepository.getCount(storeId, true);
        int negativeCnt = reviewRepository.getCount(storeId, false);
        return SellerReviewAllResponse
            .builder()
            .storeId(storeId)
            .positiveCnt(positiveCnt)
            .negativeCnt(negativeCnt)
            .build();
    }

    LocalDate getnextMonday() {
        LocalDate today = LocalDate.now();
        return today.with(TemporalAdjusters.next(DayOfWeek.MONDAY));
    }
}
