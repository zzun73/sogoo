package com.ssafy.c107.main.domain.pay.controller;

import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
import com.ssafy.c107.main.domain.pay.service.TossPaymentsServiceImpl;
import com.ssafy.c107.main.domain.pay.dto.BillingChargeDto;
import com.ssafy.c107.main.domain.pay.dto.BillingDto;
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
    private final TossPaymentsServiceImpl tossPaymentsServiceImpl;

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmPayment(@RequestBody PayDto payDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        validateMemberRoleBuyer(customUserDetails);

        String result = tossPaymentsServiceImpl.confirmPayment(customUserDetails.getUserId(), payDto);
        log.info("결제 승인: {}", result);
        return ResponseEntity.ok("결제 승인이 완료되었습니다.");
    }

    @PostMapping("/billing/prepare")
    public ResponseEntity<String> prepareBillingAuth(@RequestBody BillingDto billingDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        validateMemberRoleBuyer(customUserDetails);

        String result = tossPaymentsServiceImpl.prepareBillingAuth(billingDto);
        log.info("카드 등록: {}", result);
        return ResponseEntity.ok("카드 등록이 완료되었습니다.");
    }

    @PostMapping("/billing/charge")
    public ResponseEntity<String> chargeBilling(@RequestBody BillingChargeDto billingChargeDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        validateMemberRoleBuyer(customUserDetails);

        String result = tossPaymentsServiceImpl.chargeBilling(billingChargeDto);
        log.info("자동 결제: {}", result);
        return ResponseEntity.ok("자동 결제가 완료되었습니다.");
    }

    private static void validateMemberRoleBuyer(CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("BUYER")) {
            throw new InvalidMemberRoleException();
        }
    }
}