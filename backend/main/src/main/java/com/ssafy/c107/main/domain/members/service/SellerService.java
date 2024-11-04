package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.dto.response.MonthlySalesResponse;
import com.ssafy.c107.main.domain.members.dto.response.NextWeekQuantityResponse;
import com.ssafy.c107.main.domain.members.dto.response.ReviewDetailResponse;
import com.ssafy.c107.main.domain.members.dto.response.SalesStatusResponse;
import com.ssafy.c107.main.domain.members.dto.response.SellerReviewAllResponse;
import com.ssafy.c107.main.domain.members.dto.response.TodaySalesResponse;

public interface SellerService {

    SalesStatusResponse getSalesStatus(Long storeId);

    MonthlySalesResponse getMonthlySales(Long storeId);

    NextWeekQuantityResponse getNextCount(Long storeId);

    TodaySalesResponse getTodaySales(Long storeId);

    SellerReviewAllResponse getAllReview(Long storeId);

    ReviewDetailResponse getProductReview(Long storeId, Long foodId);
}
