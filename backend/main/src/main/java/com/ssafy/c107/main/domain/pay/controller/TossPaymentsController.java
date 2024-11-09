package com.ssafy.c107.main.domain.pay.controller;

import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
import com.ssafy.c107.main.domain.pay.service.TossPaymentsService;
import com.ssafy.c107.main.domain.pay.dto.request.AutoBillingRequest;
import com.ssafy.c107.main.domain.pay.dto.PayDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class TossPaymentsController {

    private static final Logger log = LoggerFactory.getLogger(TossPaymentsController.class);
    private final TossPaymentsService tossPaymentsService;

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmPayment(@RequestBody PayDto payDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        validateMemberRoleBuyer(customUserDetails);

        String result = tossPaymentsService.confirmPayment(customUserDetails.getUserId(), payDto);
        log.info("결제 승인: {}", result);
        return ResponseEntity.ok("결제 승인이 완료되었습니다.");
    }

    /**
     * 구독 자동결제 - tosspayment
     * 구독 빌링키 발급 및 구독 첫 결제 수행
     */
    @PostMapping("/subscriptions")
    public ResponseEntity<String> prepareBillingAuth(@RequestBody AutoBillingRequest autoBillingRequest, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        validateMemberRoleBuyer(customUserDetails);

        String result = tossPaymentsService.prepareBillingAuth(customUserDetails.getUserId(), autoBillingRequest);
        log.info("카드 등록: {}", result);
        return ResponseEntity.ok("카드 등록이 완료되었습니다.");
    }

//    @PostMapping("/billing/charge")
//    public ResponseEntity<String> chargeBilling(@RequestBody BillingChargeDto billingChargeDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
//        validateMemberRoleBuyer(customUserDetails);
//
//        String result = tossPaymentsServiceImpl.chargeBilling(customUserDetails.getUserId(), billingChargeDto);
//        log.info("자동 결제: {}", result);
//        return ResponseEntity.ok("자동 결제가 완료되었습니다.");
//    }

    private static void validateMemberRoleBuyer(CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("BUYER")) {
            throw new InvalidMemberRoleException();
        }
    }
}