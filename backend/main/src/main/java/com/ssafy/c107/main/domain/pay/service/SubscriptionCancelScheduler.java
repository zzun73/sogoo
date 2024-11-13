package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
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
public class SubscriptionCancelScheduler {

    private final MemberSubscribeRepository memberSubscribeRepository;

    @Scheduled(cron = "0 15 6 * * *")
    public void processScheduledCancellations() {
        log.info("===== Processing Scheduled Cancellations =====");

        List<MemberSubscribe> subscriptionsToCancel = memberSubscribeRepository.findAllByStatusAndEndDateBefore(
                SubscribeStatus.CANCEL_SCHEDULE, LocalDateTime.now());

        for (MemberSubscribe subscription : subscriptionsToCancel) {
            subscription.updateStatusToCanceled();
            memberSubscribeRepository.save(subscription);
            log.info("Subscription ID {} set to CANCELED", subscription.getId());
        }

        log.info("===== Scheduled Cancellations Processed =====");
    }
}
