package com.ssafy.c107.main.domain.members.controller;

import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.members.dto.response.BuyerResponse;
import com.ssafy.c107.main.domain.members.service.BuyerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/member/buyer")
public class BuyerConroller {

    private final BuyerService buyerService;

    @GetMapping("/")
    public ResponseEntity<?> index(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("BUYER")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("구매자는 접근 불가핑!");
        }

        Long userId = customUserDetails.getUserId();
        BuyerResponse buyerMyPage = buyerService.getBuyerMyPage(userId);
        return ResponseEntity.ok(buyerMyPage);
    }
}
