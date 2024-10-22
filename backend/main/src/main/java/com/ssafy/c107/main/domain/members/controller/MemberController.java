package com.ssafy.c107.main.domain.members.controller;

import com.ssafy.c107.main.domain.members.dto.request.EmailCheckDto;
import com.ssafy.c107.main.domain.members.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/email-check")
    private ResponseEntity<?> emailCheck(EmailCheckDto emailCheckDto){
        boolean isExist = memberService.emailCheck(emailCheckDto.getEmail());
        if(isExist){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이메일이 이미 존재합니다.");
        }
        return ResponseEntity.ok("사용 가능한 이메일입니다.");
    }
}
