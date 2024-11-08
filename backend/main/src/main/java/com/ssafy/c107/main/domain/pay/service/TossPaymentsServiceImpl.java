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
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribePayRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TossPaymentsServiceImpl implements TossPaymentsService {

    private static final String CONFIRM_URL = "https://api.tosspayments.com/v1/payments/confirm";
    private static final String BILLING_AUTH_URL = "https://api.tosspayments.com/v1/billing/authorizations/issue";
    private static final String BILLING_CHARGE_URL = "https://api.tosspayments.com/v1/billing";

    @Value("${toss.secret-key}")
    private String secretKey;

    private final RestTemplate restTemplate;

    private final OrderRepository orderRepository;
    private final OrderListRepository orderListRepository;
    private final StoreRepository storeRepository;
    private final FoodRepository foodRepository;
    private final MemberRepository memberRepository;
    private final SubscribeRepository subscribeRepository;
    private final MemberSubscribeRepository memberSubscribeRepository;
    private final SubscribePayRepository subscribePayRepository;

    private HttpHeaders createHeaders() {
        String auth = "Basic " + Base64.getEncoder().encodeToString((secretKey + ":").getBytes());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", auth);
        return headers;
    }

    // 결제 승인 요청을 처리
    @Override
    public String confirmPayment(Long memberId, PayDto payDto) {
        Map<String, Object> body = new HashMap<>();
        body.put("paymentKey", payDto.getPaymentKey());
        body.put("orderId", payDto.getOrderId());
        body.put("amount", payDto.getAmount());

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    CONFIRM_URL, HttpMethod.POST, new HttpEntity<>(body, createHeaders()), String.class);

            Store store = storeRepository.findById(payDto.getStoreId()).orElseThrow(StoreNotFoundException::new);
            Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

            // Order 생성
            Order savedOrder = orderRepository.save(
                    Order.builder()
                            .orderType(OrderType.FOOD)
                            .price(payDto.getAmount())
                            .member(member)
                            .store(store)
                            .build());

            // OrderList 생성
            for (FoodItemDto item : payDto.getFoodItems()) {
                Food food = foodRepository.findById(item.getFoodId()).orElseThrow(FoodNotFoundException::new);

                orderListRepository.save(OrderList.builder()
                        .order(savedOrder)
                        .food(food)
                        .count(item.getCount())
                        .price(item.getCount() * food.getPrice()) // 개별 반찬별 결제 금액
                        .build());
            }
            return response.getBody();
        } catch (Exception e) {
            throw new ConfirmPaymentFailedException();
        }
    }

    // 구독용 카드 등록 요청을 처리
    @Override
    public String prepareBillingAuth(Long memberId, AutoBillingRequest autoBillingRequest) {

        Map<String, Object> body = new HashMap<>();
        body.put("authKey", autoBillingRequest.getAuthKey());
        body.put("customerKey", autoBillingRequest.getCustomerKey());

        try {
            ResponseEntity<BillingResponse> response = restTemplate.exchange(
                    BILLING_AUTH_URL, HttpMethod.POST, new HttpEntity<>(body, createHeaders()), BillingResponse.class);
            log.info("response: {}  ", Objects.requireNonNull(response.getBody()));


            // billing key update
            String billingKey = Objects.requireNonNull(response.getBody()).getBillingKey();
            log.info("billingKey: {}", billingKey);

            // 성공시
            if (billingKey != null) {
                Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
                member.updateBillingKey(billingKey); // Member 엔티티의 메서드 사용
                memberRepository.save(member); // 변경 사항을 반영하기 위해 저장

//                subscribeRepository.findById(autoBillingRequest.getSubscribeId()).orElseThrow();
                Subscribe subscribe = subscribeRepository.findById(autoBillingRequest.getSubscribeId()).orElseThrow();

                AutoBillingDto autoBillingDto = AutoBillingDto.builder()
                        .customerKey(member.getUuid())
                        .amount(subscribe.getPrice())
                        .orderId(autoBillingRequest.getOrderId())
                        .customerEmail(member.getEmail())
                        .orderName(subscribe.getName())
                        .customerName(member.getName())
                        .build();

                MemberSubscribe ms = MemberSubscribe.builder()
                        .subscribe(subscribe)
                        .paymentStatus(PaymentStatus.NECESSARY)
                        .member(member)
                        .status(SubscribeStatus.SUBSCRIBE).build();
                memberSubscribeRepository.save(ms);

                boolean autoBillingResult = executeAutoBilling(memberId, autoBillingDto);
                if (autoBillingResult) {
                    ms.updateEndDate();
                    SubscribePay sp = SubscribePay.builder().memberSubscribe(ms).build();
                    subscribePayRepository.save(sp);
                    return "빌링키 등록 성공 및 자동 첫 결제 성공";
                } else {
                    // 익셉션 던져야함
                    return "빌링키 등록 실패 또는 자동 첫 결제 실패";
                }


            } else { // 실패시

                log.info("billing key 등록 실패");
            }
        } catch (Exception e) {
            log.error("error message: {}", e.getMessage());
            log.error("error cause: {}", e.getCause().toString());
            log.error("error toString: {}", e.toString());

            throw new BillingAuthFailedException();
        }
        return "????????????";
    }

    // 자동 결제 진행 (첫 결제에서도 사용하고, 자동결제에서도 사용하고.)
    @Override
    public boolean executeAutoBilling(Long memberId, AutoBillingDto autoBillingDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

        Map<String, Object> body = new HashMap<>();
        body.put("amount", autoBillingDto.getAmount()); // 구독 상품 금액
        body.put("customerKey", autoBillingDto.getCustomerKey()); // 사용자 uuid
        body.put("orderId", autoBillingDto.getOrderId()); // 주문번호 UUID
        body.put("orderName", autoBillingDto.getOrderName()); // 구독 상품 명
        body.put("customerName", member.getName()); // 구독자 이름
        body.put("customerEmail", member.getEmail()); // 구독자 이메일

        try {
//            ResponseEntity<Object> response = restTemplate.exchange(
//                    BILLING_CHARGE_URL + member.getBillingKey(), HttpMethod.POST, new HttpEntity<>(body, createHeaders()), Object.class);

            // 자동결제 요청
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    BILLING_CHARGE_URL + member.getBillingKey(),
                    HttpMethod.POST,
                    new HttpEntity<>(body, createHeaders()),
                    new ParameterizedTypeReference<>() {
                    } // 타입 명시
            );

            // 상태 코드가 200이고 응답 본문에서 "status"가 "DONE"이면 결제 성공
            if (response.getStatusCode().is2xxSuccessful()) {
                Map<String, Object> responseBody = response.getBody();
                if (responseBody != null && "DONE".equals(responseBody.get("status"))) {
                    return true; // 결제 성공
                }
            }
            log.info("자동결제 실패  statusCode:{}   body: {}", response.getStatusCode(), response.getBody());
            return false; // 결제 실패 시 false 반환

        } catch (Exception e) {
            log.info("[error] getMessage: {},  ", e.getMessage(), e.getCause());
            throw new BillingChargeFailedException();
        }
    }
}
