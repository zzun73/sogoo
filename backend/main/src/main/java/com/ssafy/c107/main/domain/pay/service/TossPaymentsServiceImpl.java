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
import com.ssafy.c107.main.domain.pay.dto.BillingChargeDto;
import com.ssafy.c107.main.domain.pay.dto.BillingDto;
import com.ssafy.c107.main.domain.pay.dto.FoodItemDto;
import com.ssafy.c107.main.domain.pay.dto.PayDto;
import com.ssafy.c107.main.domain.pay.exception.BillingAuthFailedException;
import com.ssafy.c107.main.domain.pay.exception.BillingChargeFailedException;
import com.ssafy.c107.main.domain.pay.exception.ConfirmPaymentFailedException;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.exception.StoreNotFoundException;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TossPaymentsServiceImpl implements TossPaymentsService {

    private static final String CONFIRM_URL = "https://api.tosspayments.com/v1/payments/confirm";
    private static final String BILLING_AUTH_URL = "https://api.tosspayments.com/v1/billing/authorizations/issue";
    private static final String BILLING_CHARGE_URL = "https://api.tosspayments.com/v1/billing";

    @Value("${toss.secret-key}")
    private String secretKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private final OrderRepository orderRepository;
    private final OrderListRepository orderListRepository;
    private final StoreRepository storeRepository;
    private final FoodRepository foodRepository;
    private final MemberRepository memberRepository;

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
    public String prepareBillingAuth(BillingDto billingDto) {
        Map<String, Object> body = new HashMap<>();
        body.put("customerKey", billingDto.getCustomerKey());
        body.put("successUrl", billingDto.getSuccessUrl());
        body.put("failUrl", billingDto.getFailUrl());
        body.put("method", "CARD");

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    BILLING_AUTH_URL, HttpMethod.POST, new HttpEntity<>(body, createHeaders()), String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new BillingAuthFailedException();
        }
    }

    // 구독 결제 요청을 처리
    @Override
    public String chargeBilling(BillingChargeDto billingChargeDto) {
        Map<String, Object> body = new HashMap<>();
        body.put("customerKey", billingChargeDto.getCustomerKey());
        body.put("orderId", billingChargeDto.getOrderId());
        body.put("amount", billingChargeDto.getAmount());
        body.put("orderName", billingChargeDto.getOrderName());

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    BILLING_CHARGE_URL, HttpMethod.POST, new HttpEntity<>(body, createHeaders()), String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new BillingChargeFailedException();
        }
    }
}
