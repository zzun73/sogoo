package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.entity.PaymentStatus;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j

public class ExpireSubscriptionScheduler {

    private final MemberSubscribeRepository memberSubscribeRepository;

    @Scheduled(cron = "0 30 6 * * *")
    public void updatePaymentStatusToNecessary() {
        log.info("======== Starting payment status update to NECESSARY ========");

        // 종료 날짜가 현재 날짜와 같거나 이전인, 결제 완료 상태의 구독 조회
        List<MemberSubscribe> subscriptionsToUpdate = memberSubscribeRepository.findAllByStatusAndEndDateBefore(
                SubscribeStatus.SUBSCRIBE, LocalDateTime.now());

        for (MemberSubscribe memberSubscribe : subscriptionsToUpdate) {
            // 결제 상태가 COMPLETE인 경우만 NECESSARY로 변경
            if (memberSubscribe.getPaymentStatus() == PaymentStatus.COMPLETE) {
                memberSubscribe.expireSubscription();
                memberSubscribeRepository.save(memberSubscribe);
                log.info("Updated payment status to NECESSARY for memberSubscribe ID: {}", memberSubscribe.getId());
            }
        }

        log.info("======== Payment status update to NECESSARY completed ========");
    }
}