package com.ssafy.c107.main.domain.subscribe.controller;

import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.subscribe.dto.request.AppendSubscribeRequest;
import com.ssafy.c107.main.domain.subscribe.dto.response.GetSubscribeResponse;
import com.ssafy.c107.main.domain.subscribe.entity.Subscribe;
import com.ssafy.c107.main.domain.subscribe.service.SubscribeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/subscribe")
@RequiredArgsConstructor
public class SubscribeController {
    private final SubscribeService subscribeService;

    @GetMapping("/{storeId}")
    public ResponseEntity<?> getSubscribe(@PathVariable Long storeId) {
        GetSubscribeResponse response = subscribeService.getSubscribe(storeId);
        return ResponseEntity.ok(response);
    }

    //구독 상품 추가
    @PostMapping("/{storedId}")
    public ResponseEntity<?> appendSubscribe(@PathVariable Long storedId,
                                             @AuthenticationPrincipal CustomUserDetails customUserDetails,
                                             @RequestBody AppendSubscribeRequest requestDto) {
        subscribeService.AppendSubscribe(storedId, customUserDetails.getUserId(), requestDto);
        return ResponseEntity.ok("구독 신청이 완료 되었습니다.");
    }
}
