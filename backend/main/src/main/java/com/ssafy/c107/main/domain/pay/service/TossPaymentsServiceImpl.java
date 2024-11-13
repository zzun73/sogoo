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
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.exception.StoreNotFoundException;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import com.ssafy.c107.main.domain.subscribe.entity.*;
import com.ssafy.c107.main.domain.subscribe.exception.SubscribeNotFoundException;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribePayRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

            // 1. 빌링키 발급
            ResponseEntity<BillingResponse> response = tossPaymentsClient.issueBillingKey(body);
            String billingKey = Objects.requireNonNull(response.getBody()).getBillingKey();
            Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

            // 2. 자동 결제 진행
            AutoBillingDto autoBillingDto = createAutoBillingDto(member, autoBillingRequest);
            boolean billingSuccess = executeAutoBilling(memberId, autoBillingRequest.getSubscribeId(), autoBillingDto, billingKey);

            // 3. 첫 결제 결과 처리
            MemberSubscribe subscription = createOrUpdateSubscription(member, autoBillingRequest.getSubscribeId(), billingKey);
            if (billingSuccess) {
                subscription.completePayment();
                memberSubscribeRepository.save(subscription);
                return "구독 신청이 성공적으로 완료되었습니다.";
            } else {
                // 첫 결제 실패 시 구독 상태를 실패로 업데이트
                subscription.cancelSubscription();
                memberSubscribeRepository.save(subscription);
                return "결제 실패로 인해 구독 신청이 취소되었습니다.";
            }
        } catch (Exception e) {
            throw new BillingAuthFailedException();
        }
    }


    private MemberSubscribe createOrUpdateSubscription(Member member, Long subscribeId, String billingKey) {
        Subscribe subscribe = subscribeRepository.findById(subscribeId).orElseThrow(SubscribeNotFoundException::new);
        return memberSubscribeRepository.findByMember_IdAndSubscribe_Id(member.getId(), subscribe.getId())
                .orElseGet(() -> {
                    MemberSubscribe newSubscription = MemberSubscribe.builder()
                            .member(member)
                            .subscribe(subscribe)
                            .status(SubscribeStatus.SUBSCRIBE)
                            .paymentStatus(PaymentStatus.NECESSARY)
                            .billingKey(billingKey)
                            .build();
                    return memberSubscribeRepository.save(newSubscription); // 저장된 새 구독 반환
                });
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

    @Override
    public boolean executeAutoBilling(Long memberId, Long subscribeId, AutoBillingDto autoBillingDto, String billingKey) {
        Map<String, Object> body = Map.of(
                "amount", autoBillingDto.getAmount(),
                "customerKey", autoBillingDto.getCustomerKey(),
                "orderId", autoBillingDto.getOrderId(),
                "orderName", autoBillingDto.getOrderName(),
                "customerName", autoBillingDto.getCustomerName(),
                "customerEmail", autoBillingDto.getCustomerEmail()
        );

        try {
            ResponseEntity<Map<String, Object>> response = tossPaymentsClient.autoBilling(billingKey, body);
            boolean success = response.getStatusCode().is2xxSuccessful() && "DONE".equals(response.getBody().get("status"));

            if (success) {
                // 결제 성공 시 결제 내역 저장 및 다음 결제일 갱신
                MemberSubscribe subscription = memberSubscribeRepository.findByMember_IdAndSubscribe_Id(memberId, subscribeId)
                        .orElseThrow(() -> new RuntimeException("Subscription not found for member: " + memberId));

                SubscribePay subscribePay = SubscribePay.builder().memberSubscribe(subscription).build();
                subscribePayRepository.save(subscribePay);

                // 결제 성공
                subscription.completePayment();
                memberSubscribeRepository.save(subscription);
            }
            return success;
        } catch (Exception e) {
            log.error("executeAutoBilling error: {}", e.getMessage(), e);
            throw new BillingChargeFailedException();
        }
    }
}
