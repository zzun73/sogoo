package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.order.exception.OrderCreationFailedException;
import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.entity.PaymentStatus;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriptionOrderScheduler {

    private final MemberSubscribeRepository memberSubscribeRepository;
    private final SubscriptionOrderService subscriptionOrderService;

    // 매주 월요일 오전 9시
    @Scheduled(cron = "0 0 9 * * MON")
    public void createWeeklySubscriptionOrders() {
        List<MemberSubscribe> activeSubscriptions = memberSubscribeRepository.findActiveSubscriptions(
                SubscribeStatus.SUBSCRIBE, PaymentStatus.COMPLETE);

        for (MemberSubscribe memberSubscribe : activeSubscriptions) {
            try {
                subscriptionOrderService.createOrderForSubscription(memberSubscribe);
            } catch (Exception e) {
                // 개별 구독 실패 시 로그 남기기
                log.error("Failed to create order for subscription: {}", memberSubscribe.getId());
                log.error(e.getMessage(), e);
                throw new OrderCreationFailedException();
            }
        }
    }
}