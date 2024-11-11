package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.common.entity.WeeklyFood;
import com.ssafy.c107.main.domain.food.repository.WeeklyFoodRepository;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.order.entity.Order;
import com.ssafy.c107.main.domain.order.entity.OrderList;
import com.ssafy.c107.main.domain.order.entity.OrderType;
import com.ssafy.c107.main.domain.order.repository.OrderListRepository;
import com.ssafy.c107.main.domain.order.repository.OrderRepository;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.entity.PaymentStatus;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeWeek;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribeWeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionOrderScheduler {

    private final MemberSubscribeRepository memberSubscribeRepository;
    private final OrderRepository orderRepository;
    private final OrderListRepository orderListRepository;
    private final SubscribeWeekRepository subscribeWeekRepository;
    private final WeeklyFoodRepository weeklyFoodRepository;

    // 매주 월요일 오전 9시
    @Scheduled(cron = "0 0 9 * * MON")
    @Transactional
    public void createWeeklySubscriptionOrders() {
        List<MemberSubscribe> activeSubscriptions = memberSubscribeRepository.findActiveSubscriptions(
                SubscribeStatus.SUBSCRIBE, PaymentStatus.COMPLETE);

        for (MemberSubscribe memberSubscribe : activeSubscriptions) {
            Member member = memberSubscribe.getMember();
            Store store = memberSubscribe.getSubscribe().getStore();
            int totalPrice = 0;

            // 구독 상품에 해당하는 현재 날짜와 일치하는 주차별 목록을 조회
            List<SubscribeWeek> subscribeWeeks = subscribeWeekRepository.findBySubscribeIdAndStartDate(
                    memberSubscribe.getSubscribe().getId(), LocalDate.now());
//            List<SubscribeWeek> subscribeWeeks = subscribeWeekRepository.findBySubscribeIdAndStartDate(
//                    memberSubscribe.getSubscribe().getId(), LocalDate.of(2024,11,11));


            // 주차별 반찬이 있는 경우에만 주문을 생성
            if (!subscribeWeeks.isEmpty()) {
                // 새로운 주문 생성
                Order order = Order.builder()
                        .orderType(OrderType.SUBSCRIBE)
                        .member(member)
                        .store(store)
                        .build();
                orderRepository.save(order);

                for (SubscribeWeek subscribeWeek : subscribeWeeks) {
                    List<WeeklyFood> weeklyFoods = weeklyFoodRepository.findBySubscribeWeekId(subscribeWeek.getId());

                    for (WeeklyFood weeklyFood : weeklyFoods) {
                        int foodPrice = weeklyFood.getFood().getPrice();
                        totalPrice += foodPrice;

                        // 주문 목록 생성
                        OrderList orderList = OrderList.builder()
                                .count(1) // 기본 수량을 1
                                .price(foodPrice) // 구독상품 금액을 개별 반찬 주문 금액합으로 ??
                                .order(order)
                                .food(weeklyFood.getFood())
                                .build();
                        orderListRepository.save(orderList);
                    }
                }

                // 총 주문 금액 업데이트
                order.updateTotalPrice(totalPrice);
            }
        }
    }
}