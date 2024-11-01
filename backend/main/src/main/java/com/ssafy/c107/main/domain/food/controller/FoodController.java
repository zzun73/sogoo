package com.ssafy.c107.main.domain.food.controller;

import com.ssafy.c107.main.domain.food.dto.request.AppendFoodRequest;
import com.ssafy.c107.main.domain.food.dto.response.FoodAllResponse;
import com.ssafy.c107.main.domain.food.service.FoodService;
import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
public class FoodController {
    private final FoodService foodService;

    // 개별 상품 추가
    @PostMapping("/{storeId}")
    public ResponseEntity<?> appendFood(@PathVariable Long storeId,
                                        @RequestBody AppendFoodRequest request,
                                        @AuthenticationPrincipal CustomUserDetails userDetails) {
        foodService.appendFood(storeId, request, userDetails.getUserRole().getRole());
        return ResponseEntity.ok("개별 반찬 등록 완료");
    }

    // 가게 전체 반찬 조회하기
    @GetMapping("/all/{storeId}")
    public ResponseEntity<?> foodAll(@PathVariable Long storeId,
                                     @AuthenticationPrincipal CustomUserDetails userDetails) {
        FoodAllResponse response = foodService.findAllFood(storeId, userDetails.getUserRole().getRole());
        return ResponseEntity.ok(response);
    }

    // 반찬가게 상세페이지[구매자용](개별반찬)
    @GetMapping("/dishes/{storeId}")
    public ResponseEntity<?> detailFoodAll(@PathVariable Long storeId,
                                           @AuthenticationPrincipal CustomUserDetails userDetails) {
        FoodAllResponse response = foodService.detailFoodAll(storeId, userDetails.getUserRole().getRole());
        return ResponseEntity.ok(response);
    }
}
