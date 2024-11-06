package com.ssafy.c107.main.domain.pay.controller;

import com.ssafy.c107.main.domain.pay.service.TossPaymentsServiceImpl;
import com.ssafy.c107.main.domain.pay.dto.BillingChargeDto;
import com.ssafy.c107.main.domain.pay.dto.BillingDto;
import com.ssafy.c107.main.domain.pay.dto.PayDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class TossPaymentsController {

    private final TossPaymentsServiceImpl tossPaymentsServiceImpl;

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmPayment(@RequestBody PayDto payDto) {
        String result = tossPaymentsServiceImpl.confirmPayment(payDto);
        return ResponseEntity.ok("결제 승인이 완료되었습니다.");
    }

    @PostMapping("/billing/prepare")
    public ResponseEntity<String> prepareBillingAuth(@RequestBody BillingDto billingDto) {
        String result = tossPaymentsServiceImpl.prepareBillingAuth(billingDto);
        return ResponseEntity.ok("카드 등록이 완료되었습니다.");
    }

    @PostMapping("/billing/charge")
    public ResponseEntity<String> chargeBilling(@RequestBody BillingChargeDto billingChargeDto) {
        String result = tossPaymentsServiceImpl.chargeBilling(billingChargeDto);
        return ResponseEntity.ok("자동 결제가 완료되었습니다.");
    }
}