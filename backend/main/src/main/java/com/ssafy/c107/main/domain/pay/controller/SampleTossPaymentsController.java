//package com.ssafy.c107.main.domain.pay.controller;
//
//import com.ssafy.c107.main.domain.pay.dto.BillingChargeDto;
//import com.ssafy.c107.main.domain.pay.dto.BillingDto;
//import com.ssafy.c107.main.domain.pay.dto.PayDto;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.Base64;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/payments")
//public class SampleTossPaymentsController {
//
//    @Value("${toss.secret-key}")
//    private String secretKey;
//
//
//    private String encodeKey(String secretKey) {
//        return Base64.getEncoder().encodeToString((secretKey + ":").getBytes());
//    }
//    /**
//     * 결제 승인 요청을 처리
//     * 프론트엔드로부터 paymentKey, orderId, amount를 받아 토스페이먼츠 API로 승인 요청을 보냄
//     */
//    @PostMapping("/confirm")
//    public ResponseEntity<String> confirmPayment(@RequestBody PayDto payDto) {
//
//        // 토스페이먼츠 API 요청 헤더 설정
//        String auth = "Basic " + Base64.getEncoder().encodeToString((secretKey + ":").getBytes());
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("Authorization", auth);
//
//        // API 요청 바디 설정
//        Map<String, Object> body = new HashMap<>();
//        body.put("paymentKey", payDto.getPaymentKey());
//        body.put("orderId", payDto.getOrderId());
//        body.put("amount", payDto.getAmount());
//
//        // RestTemplate을 이용하여 API 요청 전송
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "https://api.tosspayments.com/v1/payments/confirm";
//
//        try {
//            // API 요청 보내기
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, new HttpEntity<>(body, headers), String.class);
//
//            // 결제 승인 성공 시 성공 응답 반환
//            return ResponseEntity.ok("결제 승인이 완료되었습니다.");
//        } catch (Exception e) {
//            // 결제 승인 실패 시 에러 메시지 반환
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("결제 승인 실패: " + e.getMessage());
//        }
//    }
//
//
//    /**
//     * 구독용 카드 등록 요청을 처리
//     */
//    @PostMapping("/billing/prepare")
//    public ResponseEntity<String> prepareBillingAuth(@RequestBody BillingDto billingDto) {
//        String auth = "Basic " + encodeKey(secretKey);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("Authorization", auth);
//
//        Map<String, Object> body = new HashMap<>();
//        body.put("customerKey", billingDto.getCustomerKey());
//        body.put("successUrl", billingDto.getSuccessUrl());
//        body.put("failUrl", billingDto.getFailUrl());
//        body.put("method", "CARD"); // 구독용 카드 결제
//
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "https://api.tosspayments.com/v1/billing/authorizations";
//
//        try {
//            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
//            return ResponseEntity.ok("카드 등록이 완료되었습니다.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("카드 등록 실패: " + e.getMessage());
//        }
//    }
//
//    /**
//     * 구독 결제 요청을 처리
//     */
//    @PostMapping("/billing/charge")
//    public ResponseEntity<String> chargeBilling(@RequestBody BillingChargeDto billingChargeDto) {
//        String auth = "Basic " + encodeKey(secretKey);
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("Authorization", auth);
//
//        Map<String, Object> body = new HashMap<>();
//        body.put("customerKey", billingChargeDto.getCustomerKey());
//        body.put("orderId", billingChargeDto.getOrderId());
//        body.put("amount", billingChargeDto.getAmount());
//        body.put("orderName", billingChargeDto.getOrderName());
//
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "https://api.tosspayments.com/v1/billing";
//
//        try {
//            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
//            return ResponseEntity.ok("자동 결제가 완료되었습니다.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("자동 결제 실패: " + e.getMessage());
//        }
//    }
//}