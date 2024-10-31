package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.dto.response.SalesStatusResponse;

public interface SellerService {

    SalesStatusResponse getSalesStatus(Long storeId);

}
