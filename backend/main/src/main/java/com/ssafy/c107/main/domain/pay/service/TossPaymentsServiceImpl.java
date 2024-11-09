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
            ResponseEntity<BillingResponse> response = tossPaymentsClient.issueBillingKey(body);

            BillingResponse billingResponse = response.getBody();

            // 빌링키 업데이트
            String billingKey = Objects.requireNonNull(billingResponse).getBillingKey();
            Member member = updateBillingKeyForMember(memberId, billingKey);

            // 자동 결제 진행
            AutoBillingDto autoBillingDto = createAutoBillingDto(member, autoBillingRequest);
            processSubscription(member, autoBillingDto, autoBillingRequest.getSubscribeId());

            return "billing key 발급 및 첫 구독 결제 성공";
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
            memberSubscribe.updateEndDate();
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
            return response.getStatusCode().is2xxSuccessful() && "DONE".equals(responseBody.get("status"));
        } catch (Exception e) {
            log.error("executeAutoBilling error: {}", e.getMessage(), e);
            throw new BillingChargeFailedException();
        }
    }
}
