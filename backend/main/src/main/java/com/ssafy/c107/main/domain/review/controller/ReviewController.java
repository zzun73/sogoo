package com.ssafy.c107.main.domain.review.controller;

import com.ssafy.c107.main.domain.review.dto.response.ReviewInfoResponse;
import com.ssafy.c107.main.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    // 반찬가게 상세 페이지[구매자용](긍/부정, 한 줄 요약)
    @GetMapping("buyer/info/{storeId}")
    public ResponseEntity<?> buyerInfo(@PathVariable Long storeId) {
        ReviewInfoResponse response = reviewService.getReviewInfo(storeId);
        return ResponseEntity.ok(response);
    }
}
