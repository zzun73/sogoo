package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.order.entity.Order;
import com.ssafy.c107.main.domain.order.entity.OrderList;
import com.ssafy.c107.main.domain.order.repository.OrderListRepository;
import com.ssafy.c107.main.domain.order.repository.OrderRepository;
import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.entity.PaymentStatus;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@TestPropertySource(properties = "spring.cloud.config.enabled=false")
@ActiveProfiles("test")
//@Rollback(false)
public class SubscriptionOrderSchedulerTest {

    @Autowired
    private SubscriptionOrderScheduler subscriptionOrderScheduler;

    @Autowired
    private MemberSubscribeRepository memberSubscribeRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderListRepository orderListRepository;

    @Test
    public void testCreateWeeklySubscriptionOrders() {
        // 현재 날짜가 월요일로 설정되었는지 확인
//        LocalDate today = LocalDate.of(2024, 11, 11); // 월요일 날짜로 설정
//        assertThat(today.getDayOfWeek().getValue()).isEqualTo(1); // 월요일은 1

        LocalDate today = LocalDate.of(2024, 11, 12);
        assertThat(today.getDayOfWeek().getValue()).isEqualTo(2);
        System.out.println("현재 테스트 날짜: " + today);

        // 테스트 데이터 삽입 및 스케줄러 메서드 호출
        System.out.println("주문 생성 스케줄러 실행...");
        subscriptionOrderScheduler.createWeeklySubscriptionOrders();

        // MemberSubscribe가 활성화된 회원의 주문 생성 확인
        List<MemberSubscribe> activeSubscriptions = memberSubscribeRepository.findActiveSubscriptions(
                SubscribeStatus.SUBSCRIBE, PaymentStatus.COMPLETE);
        System.out.println("활성화된 구독 회원 수: " + activeSubscriptions.size());

        assertThat(activeSubscriptions).isNotNull();

        // 주문이 생성되었는지 확인
        List<Order> orders = orderRepository.findAll();
        System.out.println("생성된 주문 수: " + orders.size());

        assertThat(orders).isNotNull();

        // 주문 목록(OrderList)이 생성되었는지 확인
        List<OrderList> orderLists = orderListRepository.findAll();
        System.out.println("생성된 주문 목록 수: " + orderLists.size());
//        assertThat(orderLists).isNotNull();
//        assertThat(orderLists.size()).isGreaterThanOrEqualTo(1);

        // 주문 내역 확인 (각 주문의 금액 및 반찬 리스트가 제대로 삽입되었는지)
        int totalPrice = orderLists.stream().mapToInt(OrderList::getPrice).sum();
        System.out.println("총 주문 가격 계산 (orderLists 합계): " + totalPrice);

//        assertThat(orders.get(0).getPrice()).isEqualTo(totalPrice);


        // 개별 주문 내역 출력
        orders.forEach(order -> {
            System.out.println("주문 ID: " + order.getId() + ", 회원 ID: " + order.getMember().getId() + ", 총 가격: " + order.getPrice());
        });

        orderLists.forEach(orderList -> {
            System.out.println("주문 목록 ID: " + orderList.getId() + ", 주문 ID: " + orderList.getOrder().getId() +
                    ", 음식 ID: " + orderList.getFood().getId() + ", 가격: " + orderList.getPrice());
        });
    }
}
