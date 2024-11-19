package com.ssafy.c107.main.domain.pay.service;

import com.ssafy.c107.main.domain.pay.dto.AutoBillingDto;
import com.ssafy.c107.main.domain.pay.dto.request.AutoBillingRequest;
import com.ssafy.c107.main.domain.pay.dto.PayDto;

public interface TossPaymentsService {

    String confirmPayment(Long memberId, PayDto payDto);

    String prepareBillingAuth(Long memberId, AutoBillingRequest autoBillingRequest);

    boolean executeAutoBilling(Long memberId, Long subscribeId, AutoBillingDto autoBillingDto, String billingKey);

}
