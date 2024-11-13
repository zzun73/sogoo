package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.pay.dto.AutoBillingDto;
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
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AutomaticPaymentScheduler {

    private final MemberSubscribeRepository memberSubscribeRepository;
    private final TossPaymentsService tossPaymentsService;

    @Scheduled(cron = "0 0 7 * * *")
    public void processScheduledBilling() {
        log.info("============Starting scheduled billing============");

        // 구독 상태가 SUBSCRIBE 종료 날짜(endDate)가 지난 구독 목록을 조회
        List<MemberSubscribe> memberSubscribes = memberSubscribeRepository.findAllByStatusAndEndDateBefore(
                SubscribeStatus.SUBSCRIBE, LocalDateTime.now());

        for (MemberSubscribe memberSubscribe : memberSubscribes) {
            // 각 구독의 결제 상태가 NECESSARY인지 확인 (결제가 필요한 상태만 처리)
            if (memberSubscribe.getPaymentStatus() == PaymentStatus.NECESSARY) {
                try {
                    // 자동 결제 서비스 호출
                    boolean billingSuccess = tossPaymentsService.executeAutoBilling(
                            memberSubscribe.getMember().getId(),
                            memberSubscribe.getSubscribe().getId(),
                            AutoBillingDto.builder()
                                    .customerKey(memberSubscribe.getMember().getUuid())
                                    .amount(memberSubscribe.getSubscribe().getPrice())
                                    .orderId(UUID.randomUUID().toString())
                                    .customerEmail(memberSubscribe.getMember().getEmail())
                                    .orderName(memberSubscribe.getSubscribe().getName())
                                    .customerName(memberSubscribe.getMember().getName())
                                    .build(),
                            memberSubscribe.getBillingKey()
                    );

                    // 결제 성공 여부에 따라 구독 상태 업데이트
                    if (billingSuccess) {
                        memberSubscribe.completePayment();
                        memberSubscribeRepository.save(memberSubscribe);
                        log.info("Billing successful for memberSubscribe ID: {}", memberSubscribe.getId());
                    } else {
                        memberSubscribe.cancelSubscription();
                        memberSubscribeRepository.save(memberSubscribe);
                        log.warn("Billing failed for memberSubscribe ID: {}", memberSubscribe.getId());
                    }
                } catch (Exception e) {
                    log.error("Error processing billing for memberSubscribe ID: {}", memberSubscribe.getId(), e);
                }
            }
        }

        log.info("=========Scheduled billing completed.==============");
    }
}
