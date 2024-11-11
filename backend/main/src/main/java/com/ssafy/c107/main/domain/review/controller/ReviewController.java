package com.ssafy.c107.main.domain.review.controller;

import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
import com.ssafy.c107.main.domain.review.dto.request.CreateReviewInfoRequest;
import com.ssafy.c107.main.domain.review.dto.response.FoodDetailResponse;
import com.ssafy.c107.main.domain.review.dto.response.ReviewInfoResponse;
import com.ssafy.c107.main.domain.review.dto.response.StoreReviewResponse;
import com.ssafy.c107.main.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping(value = "/orders/{orderListId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createReview(@PathVariable Long orderListId,
                                          @ModelAttribute CreateReviewInfoRequest request,
                                          @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        if (!customUserDetails.getUserRole().getRole().equals("BUYER")) {
            throw new InvalidMemberRoleException();
        }

        reviewService.writeReview(orderListId, request);

        return ResponseEntity.ok("");
    }

    // 반찬가게 상세 페이지[구매자용](긍/부정, 한 줄 요약)
    @GetMapping("buyer/info/{storeId}")
    public ResponseEntity<?> buyerInfo(@PathVariable Long storeId) {
        ReviewInfoResponse response = reviewService.getReviewInfo(storeId);
        return ResponseEntity.ok(response);
    }

    // 반찬가게 상세페이지[구매자용](반찬별 리뷰)
    @GetMapping("buyer/{storeId}")
    public ResponseEntity<?> getStoreReviews(@PathVariable Long storeId, @RequestParam(name = "page") int page) {
        StoreReviewResponse response = reviewService.getStoreReviews(storeId, page);
        return ResponseEntity.ok(response);
    }

    // 반찬별 리뷰 조회
    @GetMapping("buyer/food/{foodId}")
    public ResponseEntity<?> getStoreReviewsByFood(@PathVariable Long foodId) {
        FoodDetailResponse response = reviewService.getFoodDetails(foodId);
        return ResponseEntity.ok(response);
    }
}
