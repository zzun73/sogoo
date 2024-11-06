package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.pay.dto.BillingChargeDto;
import com.ssafy.c107.main.domain.pay.dto.BillingDto;
import com.ssafy.c107.main.domain.pay.dto.PayDto;
import com.ssafy.c107.main.domain.pay.exception.BillingAuthFailedException;
import com.ssafy.c107.main.domain.pay.exception.BillingChargeFailedException;
import com.ssafy.c107.main.domain.pay.exception.ConfirmPaymentFailedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class TossPaymentsServiceImpl implements TossPaymentsService {

    @Value("${toss.secret-key}")
    private String secretKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String CONFIRM_URL = "https://api.tosspayments.com/v1/payments/confirm";
    private static final String BILLING_AUTH_URL = "https://api.tosspayments.com/v1/billing/authorizations";
    private static final String BILLING_CHARGE_URL = "https://api.tosspayments.com/v1/billing";

    private HttpHeaders createHeaders() {
        String auth = "Basic " + Base64.getEncoder().encodeToString((secretKey + ":").getBytes());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", auth);
        return headers;
    }

    // 결제 승인 요청을 처리
    @Override
    public String confirmPayment(PayDto payDto) {
        Map<String, Object> body = new HashMap<>();
        body.put("paymentKey", payDto.getPaymentKey());
        body.put("orderId", payDto.getOrderId());
        body.put("amount", payDto.getAmount());

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    CONFIRM_URL, HttpMethod.POST, new HttpEntity<>(body, createHeaders()), String.class);
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
