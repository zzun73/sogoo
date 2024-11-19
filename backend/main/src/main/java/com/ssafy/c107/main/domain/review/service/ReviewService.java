package com.ssafy.c107.main.domain.review.service;

import com.ssafy.c107.main.domain.review.dto.request.CreateReviewInfoRequest;
import com.ssafy.c107.main.domain.review.dto.response.FoodDetailResponse;
import com.ssafy.c107.main.domain.review.dto.response.ReviewCountResponse;
import com.ssafy.c107.main.domain.review.dto.response.ReviewInfoResponse;
import com.ssafy.c107.main.domain.review.dto.response.StoreReviewResponse;

public interface ReviewService {

    void writeReview(Long orderListId, CreateReviewInfoRequest createReviewInfoRequest);

    ReviewInfoResponse getReviewInfo(Long storeId);

    StoreReviewResponse getStoreReviews(Long storeId, int page);

    FoodDetailResponse getFoodDetails(Long foodId, int page);

    ReviewCountResponse getStoreReviewCount(Long storeId);

    ReviewCountResponse getFoodDetailCount(Long foodId);
}