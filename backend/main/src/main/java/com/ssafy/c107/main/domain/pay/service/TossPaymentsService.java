package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.pay.dto.BillingChargeDto;
import com.ssafy.c107.main.domain.pay.dto.BillingDto;
import com.ssafy.c107.main.domain.pay.dto.PayDto;

public interface TossPaymentsService {

    String confirmPayment(Long memberId, PayDto payDto);

    String prepareBillingAuth(BillingDto billingDto);

    String chargeBilling(BillingChargeDto billingChargeDto);

}
