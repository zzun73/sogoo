package com.ssafy.c107.main.domain.subscribe.controller;

import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
import com.ssafy.c107.main.domain.subscribe.service.MemberSubscribeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/subscribe")
@RequiredArgsConstructor
public class MemberSubscribeController {

    private final MemberSubscribeService memberSubscribeService;

    @PostMapping("/cancel/{memberSubscribeId}")
    public ResponseEntity<Void> cancelSubscription(@PathVariable Long memberSubscribeId, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        log.info("===== Request to Cancel Subscription =====");
        validateMemberRoleBuyer(customUserDetails);

        memberSubscribeService.cancelSubscription(customUserDetails.getUserId(), memberSubscribeId);
        return ResponseEntity.ok().build();
    }

    private static void validateMemberRoleBuyer(CustomUserDetails customUserDetails) {
        if (!customUserDetails.getUserRole().getRole().equals("BUYER")) {
            throw new InvalidMemberRoleException();
        }
    }
}
