package com.ssafy.c107.main.domain.review.service;

import com.ssafy.c107.main.domain.review.dto.response.ReviewInfoResponse;

public interface ReviewService {
    ReviewInfoResponse getReviewInfo(Long storeId);
}
