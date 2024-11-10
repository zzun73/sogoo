package com.ssafy.c107.main.domain.pay.quartz;

import com.ssafy.c107.main.domain.pay.dto.AutoBillingDto;
import com.ssafy.c107.main.domain.pay.service.TossPaymentsService;
import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AutoBillingJob implements Job {

    private final TossPaymentsService tossPaymentsService;
    private final MemberSubscribeRepository memberSubscribeRepository;
    private final QuartzConfig quartzConfig;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {

        Long subscriptionId = context.getJobDetail().getJobDataMap().getLong("subscriptionId");
        MemberSubscribe subscription = memberSubscribeRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found: " + subscriptionId));

        // 자동 결제 수행
        boolean billingSuccess = tossPaymentsService.executeAutoBilling(
                subscription.getMember().getId(),
                new AutoBillingDto(
                        subscription.getMember().getBillingKey(),
                        subscription.getMember().getUuid(),
                        subscription.getSubscribe().getPrice(),
                        subscription.getSubscribe().getName(),
                        subscription.getMember().getName(),
                        subscription.getMember().getEmail()
                )
        );

        if (billingSuccess) {
            // 결제 성공 시, 결제 내역 저장 및 구독 완료 처리
            subscription.completePayment();
            memberSubscribeRepository.save(subscription);

            // 다음 결제 일자를 기준으로 스케줄링 재설정
            quartzConfig.scheduleAutoBillingJob(subscriptionId, subscription.getEndDate());

        } else {
            throw new JobExecutionException("Failed to process auto billing for subscription: " + subscriptionId);
        }
    }
}

