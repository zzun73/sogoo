package com.ssafy.c107.main.domain.members.controller;

import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
import com.ssafy.c107.main.domain.members.service.SellerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/member/seller")
@RequiredArgsConstructor
public class SellerController {

    private final SellerService sellerService;

    @GetMapping("/sales-status/{storeId}")
    public ResponseEntity<?> getSellerSellStatus(@PathVariable(name = "storeId") Long storeId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getSalesStatus(storeId, userId));
    }

    @GetMapping("/monthly-sales/{storeId}")
    public ResponseEntity<?> getMonthlySales(@PathVariable(name = "storeId") Long storeId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getMonthlySales(storeId, userId));
    }

    @GetMapping("/next-week-sell/{storeId}")
    public ResponseEntity<?> getNextCount(@PathVariable(name = "storeId") Long storeId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getNextCount(storeId, userId));
    }

    @GetMapping("/today-sell/{storeId}")
    public ResponseEntity<?> getTodaySales(@PathVariable(name = "storeId") Long storeId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getTodaySales(storeId, userId));
    }

    @GetMapping("/store-review/{storeId}")
    public ResponseEntity<?> getReviewAll(@PathVariable(name = "storeId") Long storeId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getAllReview(storeId, userId));
    }

    @GetMapping("/detail-review/{storeId}/{foodId}")
    public ResponseEntity<?> getProductReview(@PathVariable(name = "storeId") Long storeId,
        @PathVariable(name = "foodId") Long foodId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam(name = "page") int page) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getProductReview(storeId, foodId, userId, page));
    }

    @GetMapping("/detail-review/count/{storeId}/{foodId}")
    public ResponseEntity<?> getProductReviewCount(Long storeId, Long foodId, @AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestParam(name = "page") int page) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return null;
    }

    @GetMapping("/all-product/{storeId}")
    public ResponseEntity<?> getAllProducts(@PathVariable(name = "storeId") Long storeId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getAllProduct(storeId, userId));
    }

    @GetMapping("/foods/{storeId}")
    public ResponseEntity<?> getAllFoods(@PathVariable(name = "storeId") Long storeId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getAllFood(storeId, userId));
    }
}
