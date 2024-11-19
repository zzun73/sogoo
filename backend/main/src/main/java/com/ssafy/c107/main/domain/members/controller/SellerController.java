package com.ssafy.c107.main.domain.members.controller;

import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.members.exception.CreateExcelException;
import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
import com.ssafy.c107.main.domain.members.service.SellerService;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getAllReview(storeId, userId));
    }

    @GetMapping("/detail-review/{storeId}/{foodId}")
    public ResponseEntity<?> getProductReview(@PathVariable(name = "storeId") Long storeId,
        @PathVariable(name = "foodId") Long foodId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails,
        @RequestParam(name = "page") int page) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getProductReview(storeId, foodId, userId, page));
    }

    @GetMapping("/detail-review/count/{storeId}/{foodId}")
    public ResponseEntity<?> getProductReviewCount(@PathVariable Long storeId,
        @PathVariable Long foodId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();
        return ResponseEntity.ok(sellerService.getProductReviewCount(storeId, userId, foodId));
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

    @GetMapping("/download/{storeId}")
    public ResponseEntity<?> downloadExcel(@PathVariable Long storeId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("SELLER")) {
            throw new InvalidMemberRoleException();
        }
        Long userId = customUserDetails.getUserId();

        byte[] excelBytes;

        log.info("userId : {}", userId);

        try {
            excelBytes = sellerService.downloadExcel(storeId, userId);
        } catch (Exception e) {
            log.info("error message : {}", e.getMessage());
            throw new CreateExcelException();
        }

        // 현재 날짜를 파일명에 포함
        String fileName = "delivery_orders_" +
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")) +
            ".xlsx";

        // 한글 파일명을 위한 인코딩
        String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", encodedFileName);

        return new ResponseEntity<>(excelBytes, headers, HttpStatus.OK);
    }
}
