package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.food.exception.FoodNotFoundException;
import com.ssafy.c107.main.domain.food.repository.FoodRepository;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import com.ssafy.c107.main.domain.order.entity.Order;
import com.ssafy.c107.main.domain.order.entity.OrderList;
import com.ssafy.c107.main.domain.order.entity.OrderType;
import com.ssafy.c107.main.domain.order.repository.OrderListRepository;
import com.ssafy.c107.main.domain.order.repository.OrderRepository;
import com.ssafy.c107.main.domain.pay.client.TossPaymentsClient;
import com.ssafy.c107.main.domain.pay.dto.AutoBillingDto;
import com.ssafy.c107.main.domain.pay.dto.request.AutoBillingRequest;
import com.ssafy.c107.main.domain.pay.dto.FoodItemDto;
import com.ssafy.c107.main.domain.pay.dto.PayDto;
import com.ssafy.c107.main.domain.pay.dto.response.BillingResponse;
import com.ssafy.c107.main.domain.pay.exception.BillingAuthFailedException;
import com.ssafy.c107.main.domain.pay.exception.BillingChargeFailedException;
import com.ssafy.c107.main.domain.pay.exception.ConfirmPaymentFailedException;
import com.ssafy.c107.main.domain.pay.quartz.QuartzConfig;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.exception.StoreNotFoundException;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import com.ssafy.c107.main.domain.subscribe.entity.*;
import com.ssafy.c107.main.domain.subscribe.exception.MemberSubscribeNotFoundException;
import com.ssafy.c107.main.domain.subscribe.exception.SubscribeNotFoundException;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribePayRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TossPaymentsServiceImpl implements TossPaymentsService {

    private final TossPaymentsClient tossPaymentsClient;
    private final OrderRepository orderRepository;
    private final OrderListRepository orderListRepository;
    private final StoreRepository storeRepository;
    private final FoodRepository foodRepository;
    private final MemberRepository memberRepository;
    private final SubscribeRepository subscribeRepository;
    private final MemberSubscribeRepository memberSubscribeRepository;
    private final SubscribePayRepository subscribePayRepository;


    private final QuartzConfig quartzConfig;


    // 결제 승인 요청을 처리
    @Override
    public String confirmPayment(Long memberId, PayDto payDto) {
        Map<String, Object> body = Map.of(
                "paymentKey", payDto.getPaymentKey(),
                "orderId", payDto.getOrderId(),
                "amount", payDto.getAmount()
        );

        try {
            ResponseEntity<String> response = tossPaymentsClient.confirmPayment(body);
            createOrderAndOrderList(memberId, payDto);
            return response.getBody();
        } catch (Exception e) {
            log.error("confirmPayment error: {}", e.getMessage(), e);
            throw new ConfirmPaymentFailedException();
        }
    }

    private void createOrderAndOrderList(Long memberId, PayDto payDto) {
        Store store = storeRepository.findById(payDto.getStoreId()).orElseThrow(StoreNotFoundException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

        // 주문 생성
        Order savedOrder = orderRepository.save(
                Order.builder()
                        .orderType(OrderType.FOOD)
                        .price(payDto.getAmount())
                        .member(member)
                        .store(store)
                        .build()
        );

        // 주문 목록 생성
        for (FoodItemDto item : payDto.getFoodItems()) {
            Food food = foodRepository.findById(item.getFoodId()).orElseThrow(FoodNotFoundException::new);
            orderListRepository.save(OrderList.builder()
                    .order(savedOrder)
                    .food(food)
                    .count(item.getCount())
                    .price(item.getCount() * food.getPrice())
                    .build()
            );
        }
    }


    @Override
    public String prepareBillingAuth(Long memberId, AutoBillingRequest autoBillingRequest) {
        Map<String, Object> body = Map.of(
                "authKey", autoBillingRequest.getAuthKey(),
                "customerKey", autoBillingRequest.getCustomerKey()
        );
        try {
            ResponseEntity<BillingResponse> response = tossPaymentsClient.issueBillingKey(body);
            log.info("response: {}", response);

            BillingResponse billingResponse = response.getBody();
            log.info("billingResponse: {}", billingResponse);

            // 빌링키 업데이트
            String billingKey = Objects.requireNonNull(billingResponse).getBillingKey();
            log.info("billingKey: {}", billingKey);

            Member member = updateBillingKeyForMember(memberId, billingKey);

            // 자동 결제 진행
            AutoBillingDto autoBillingDto = createAutoBillingDto(member, autoBillingRequest);
            processSubscription(member, autoBillingDto, autoBillingRequest.getSubscribeId());

            // TODO: 첫 결제 성공 후 Quartz 스케줄 설정
//            MemberSubscribe subscription = memberSubscribeRepository.findByMember_Id(memberId)
//                    .orElseThrow(() -> new RuntimeException("Subscription not found for member: " + memberId));
//
//            quartzConfig.scheduleAutoBillingJob(subscription.getId(), subscription.getEndDate());

            return "Billing key 발급 및 첫 구독 결제 성공";
        } catch (Exception e) {
            throw new BillingAuthFailedException();
        }
    }

    private Member updateBillingKeyForMember(Long memberId, String billingKey) {
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
        member.updateBillingKey(billingKey);
        return memberRepository.save(member);
    }

    private AutoBillingDto createAutoBillingDto(Member member, AutoBillingRequest autoBillingRequest) {
        Subscribe subscribe = subscribeRepository.findById(autoBillingRequest.getSubscribeId())
                .orElseThrow(SubscribeNotFoundException::new);

        return AutoBillingDto.builder()
                .customerKey(member.getUuid())
                .amount(subscribe.getPrice())
                .orderId(autoBillingRequest.getOrderId())
                .customerEmail(member.getEmail())
                .orderName(subscribe.getName())
                .customerName(member.getName())
                .build();
    }

    private void processSubscription(Member member, AutoBillingDto autoBillingDto, Long subscribeId) {
        MemberSubscribe memberSubscribe = createMemberSubscribe(member, subscribeId);
        boolean billingSuccess = executeAutoBilling(member.getId(), autoBillingDto);

        if (billingSuccess) {
            memberSubscribe.completePayment();
            SubscribePay subscribePay = SubscribePay.builder().memberSubscribe(memberSubscribe).build();
            subscribePayRepository.save(subscribePay);
        } else {
            log.error("자동 결제 실패");
            throw new BillingChargeFailedException();
        }
    }

    private MemberSubscribe createMemberSubscribe(Member member, Long subscribeId) {
        Subscribe subscribe = subscribeRepository.findById(subscribeId).orElseThrow(SubscribeNotFoundException::new);

        MemberSubscribe memberSubscribe = MemberSubscribe.builder()
                .subscribe(subscribe)
                .paymentStatus(PaymentStatus.NECESSARY)
                .member(member)
                .status(SubscribeStatus.SUBSCRIBE)
                .build();

        return memberSubscribeRepository.save(memberSubscribe);
    }


    @Override
    public boolean executeAutoBilling(Long memberId, AutoBillingDto autoBillingDto) {
        Map<String, Object> body = Map.of(
                "amount", autoBillingDto.getAmount(),
                "customerKey", autoBillingDto.getCustomerKey(),
                "orderId", autoBillingDto.getOrderId(),
                "orderName", autoBillingDto.getOrderName(),
                "customerName", autoBillingDto.getCustomerName(),
                "customerEmail", autoBillingDto.getCustomerEmail()
        );

        try {
            ResponseEntity<Map<String, Object>> response = tossPaymentsClient.autoBilling(memberRepository.findById(memberId)
                    .orElseThrow(MemberNotFoundException::new).getBillingKey(), body);

            Map<String, Object> responseBody = response.getBody();
            boolean success = response.getStatusCode().is2xxSuccessful() && "DONE".equals(responseBody.get("status"));
            if (success) {
                // 결제 성공 시 결제 내역 저장 및 다음 결제일 갱신
                MemberSubscribe subscription = memberSubscribeRepository.findByMember_Id(memberId)
                        .orElseThrow(() -> new RuntimeException("Subscription not found for member: " + memberId));

                SubscribePay subscribePay = SubscribePay.builder().memberSubscribe(subscription).build();
                subscribePayRepository.save(subscribePay);

                // 결제 성공 시 다음 결제일 설정 및 Quartz 스케줄 갱신
                subscription.completePayment();
                memberSubscribeRepository.save(subscription);
                quartzConfig.scheduleAutoBillingJob(subscription.getId(), subscription.getEndDate());
            }
            return success;
        } catch (Exception e) {
            log.error("executeAutoBilling error: {}", e.getMessage(), e);
            throw new BillingChargeFailedException();
        }
    }


    // 결제 승인 및 구독 생성 로직
    public void registerSubscription(Long memberId, AutoBillingRequest autoBillingRequest) {
        // 구독 생성 로직 수행
        MemberSubscribe memberSubscribe = createSubscription(memberId, autoBillingRequest);

        // 첫 결제 성공 후 다음 결제일 기준으로 Quartz Job 등록
        LocalDateTime nextBillingDate = memberSubscribe.getEndDate();
        quartzConfig.scheduleAutoBillingJob(memberSubscribe.getId(), nextBillingDate);
    }

    private MemberSubscribe createSubscription(Long memberId, AutoBillingRequest autoBillingRequest) {
        // Member와 Subscribe 엔티티를 조회
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
        Subscribe subscribe = subscribeRepository.findById(autoBillingRequest.getSubscribeId()).orElseThrow(SubscribeNotFoundException::new);

        // MemberSubscribe 생성 및 저장
        MemberSubscribe memberSubscribe = MemberSubscribe.builder()
                .member(member)  // memberId 대신 member 객체로 설정
                .subscribe(subscribe)  // 구독 상품 설정
                .paymentStatus(PaymentStatus.COMPLETE)  // 첫 결제 상태 완료로 설정
                .status(SubscribeStatus.SUBSCRIBE)  // 구독 상태 설정
                .build();

        memberSubscribe.completePayment();

        return memberSubscribeRepository.save(memberSubscribe);
    }

    public void cancelSubscription(Long subscriptionId) {
        try {
            MemberSubscribe memberSubscribe = memberSubscribeRepository.findById(subscriptionId)
                    .orElseThrow(MemberSubscribeNotFoundException::new);
            memberSubscribe.cancelSubscription();
            memberSubscribeRepository.save(memberSubscribe);

            quartzConfig.removeScheduledJob(subscriptionId);
        } catch (Exception e) {
            log.error("Failed to cancel subscription or remove job for ID: " + subscriptionId, e);
            throw new RuntimeException("Cancellation failed for subscription ID: " + subscriptionId, e);
        }
    }
}
