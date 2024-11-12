package com.ssafy.c107.main.domain.pay.quartz;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;


@Configuration
@RequiredArgsConstructor
public class QuartzConfig {

    private final SchedulerFactoryBean schedulerFactoryBean;
    private Scheduler scheduler;

    @PostConstruct
    public void initializeScheduler() {
        this.scheduler = schedulerFactoryBean.getScheduler();
    }

    @Bean
    public Scheduler scheduler() {
        return schedulerFactoryBean.getScheduler();
    }

    public void scheduleAutoBillingJob(Long subscriptionId, LocalDateTime nextBillingDate) {
        try {
            JobDetail jobDetail = createJobDetail(subscriptionId);
            Trigger trigger = createTrigger(subscriptionId, nextBillingDate);
            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            throw new RuntimeException("Failed to schedule job for subscription ID " + subscriptionId, e);
        }
    }

    public void removeScheduledJob(Long subscriptionId) {
        try {
            JobKey jobKey = new JobKey("autoBillingJob-" + subscriptionId, "autoBillingGroup");
            if (scheduler.checkExists(jobKey)) {
                scheduler.deleteJob(jobKey);
            }
        } catch (SchedulerException e) {
            throw new RuntimeException("Failed to remove scheduled job for subscription ID " + subscriptionId, e);
        }
    }

    private JobDetail createJobDetail(Long subscriptionId) {
        return JobBuilder.newJob(AutoBillingJob.class)
                .withIdentity("autoBillingJob-" + subscriptionId, "autoBillingGroup")
                .usingJobData("subscriptionId", subscriptionId)
                .build();
    }

    private Trigger createTrigger(Long subscriptionId, LocalDateTime nextBillingDate) {
        return TriggerBuilder.newTrigger()
                .withIdentity("autoBillingTrigger-" + subscriptionId, "autoBillingGroup")
                .startAt(Date.from(nextBillingDate.atZone(ZoneId.systemDefault()).toInstant()))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withMisfireHandlingInstructionFireNow())
                .build();
    }
}
