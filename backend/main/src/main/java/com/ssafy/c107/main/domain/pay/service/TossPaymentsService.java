package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.pay.dto.AutoBillingDto;
import com.ssafy.c107.main.domain.pay.dto.request.AutoBillingRequest;
import com.ssafy.c107.main.domain.pay.dto.PayDto;
import com.ssafy.c107.main.domain.pay.dto.response.BillingResponse;

public interface TossPaymentsService {

    String confirmPayment(Long memberId, PayDto payDto);

    String prepareBillingAuth(Long memberId, AutoBillingRequest autoBillingRequest);

    boolean executeAutoBilling(Long memberId, AutoBillingDto autoBillingDto, String billingKey);

}
