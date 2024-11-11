package com.ssafy.c107.main.domain.subscribe.entity;

import com.ssafy.c107.main.common.entity.BaseEntity;
import com.ssafy.c107.main.domain.members.entity.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "MemberSubscribe")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberSubscribe extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    private SubscribeStatus status;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subscribe_id")
    private Subscribe subscribe;

    @Builder
    public MemberSubscribe(SubscribeStatus status, PaymentStatus paymentStatus, Member member, Subscribe subscribe) {
        this.status = status;
        this.paymentStatus = paymentStatus;
        this.member = member;
        this.subscribe = subscribe;
    }

    public void completePayment() {
        this.paymentStatus = PaymentStatus.COMPLETE;
        this.endDate = LocalDateTime.of(LocalDate.now().plusDays(31), LocalTime.of(6, 0)); // 결제일 기준 + 31일 오전 6시
//        this.endDate = LocalDateTime.now().plusMinutes(1);
    }

    public void cancelSubscription() {
        this.status = SubscribeStatus.CANCELED;
    }
}
