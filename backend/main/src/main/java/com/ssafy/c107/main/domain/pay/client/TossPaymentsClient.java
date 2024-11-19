package com.ssafy.c107.main.domain.pay.client;

import com.ssafy.c107.main.domain.pay.dto.response.BillingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class TossPaymentsClient {

    private final RestTemplate restTemplate;
    private static final String CONFIRM_PAYMENT_URL = "https://api.tosspayments.com/v1/payments/confirm";
    private static final String ISSUE_BILLING_KEY_URL = "https://api.tosspayments.com/v1/billing/authorizations/issue";
    private static final String AUTO_BILLING_URL = "https://api.tosspayments.com/v1/billing/";

    @Value("${toss.widget.secret-key}")
    private String widgetSecretKey;
    @Value("${toss.api.secret-key}")
    private String apiSecretKey;

    public ResponseEntity<String> confirmPayment(Map<String, Object> body) {
        return restTemplate.exchange(
                CONFIRM_PAYMENT_URL,
                HttpMethod.POST,
                new HttpEntity<>(body, createHeaders(widgetSecretKey)),
                String.class
        );
    }

    public ResponseEntity<BillingResponse> issueBillingKey(Map<String, Object> body) {
        return restTemplate.exchange(
                ISSUE_BILLING_KEY_URL,
                HttpMethod.POST,
                new HttpEntity<>(body, createHeaders(apiSecretKey)),
                BillingResponse.class
        );
    }

    public ResponseEntity<Map<String, Object>> autoBilling(String billingKey, Map<String, Object> body) {
        return restTemplate.exchange(
                AUTO_BILLING_URL + billingKey,
                HttpMethod.POST,
                new HttpEntity<>(body, createHeaders(apiSecretKey)),
                new ParameterizedTypeReference<>() {
                }
        );
    }

    private HttpHeaders createHeaders(String key) {
        String auth = "Basic " + Base64.getEncoder().encodeToString((key + ":").getBytes());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set(HttpHeaders.AUTHORIZATION, auth);
        return headers;
    }
}