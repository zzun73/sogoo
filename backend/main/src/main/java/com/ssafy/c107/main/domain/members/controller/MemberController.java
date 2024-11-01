package com.ssafy.c107.main.domain.members.controller;

import com.ssafy.c107.main.common.jwt.JWTUtil;
import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.members.dto.request.EmailCheckRequest;
import com.ssafy.c107.main.domain.members.dto.request.SellerCheckRequest;
import com.ssafy.c107.main.domain.members.dto.request.SignUpRequest;
import com.ssafy.c107.main.domain.members.dto.request.UpdateAddressRequest;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.entity.MemberRole;
import com.ssafy.c107.main.domain.members.entity.WithDrawalStatus;
import com.ssafy.c107.main.domain.members.exception.MemberExistException;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.exception.SellerNotFoundException;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import com.ssafy.c107.main.domain.members.service.MemberService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final JWTUtil jwtUtil;

    @PostMapping("/email-check")
    public ResponseEntity<?> emailCheck(@RequestBody EmailCheckRequest emailCheckDto) {
        boolean isExist = memberService.emailCheck(emailCheckDto.getEmail());
        if (isExist) {
            throw new MemberExistException();
        }
        return ResponseEntity.ok("사용 가능한 이메일핑");
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpDto) {
        memberService.signUp(Member
            .builder()
            .name(signUpDto.getName())
            .birth(signUpDto.getBirth())
            .phoneNumber(signUpDto.getPhoneNumber())
            .role(signUpDto.getRole().equals("Buyer") ? MemberRole.BUYER : MemberRole.SELLER)
            .password(signUpDto.getPassword())
            .email(signUpDto.getEmail())
            .withDrawalStatus(WithDrawalStatus.ACTIVE)
            .address(signUpDto.getAddress())
            .build());
        return ResponseEntity.ok("회원가입 완료핑");
    }

    @PostMapping("/seller-check")
    public ResponseEntity<?> checkSeller(@RequestBody SellerCheckRequest sellerCheckRequest) {
        boolean isExist = memberService.sellerCheck(sellerCheckRequest.getBusinessNumber());
        if (isExist) {
            return ResponseEntity.ok("사업자 인증 완료핑");
        } else {
            throw new SellerNotFoundException();
        }
    }

    @PutMapping("/update-address")
    public ResponseEntity<?> updateAddress(@RequestBody UpdateAddressRequest updateAddressDto,
        @AuthenticationPrincipal
        CustomUserDetails customUserDetails) {
        Long userId = customUserDetails.getUserId();
        memberService.changeAddress(userId, updateAddressDto.getAddress());
        return ResponseEntity.ok("주소 변경을 완료했습니다.");
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        //get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {

            //response status code
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("refresh token null");
        }

        //expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            //response status code
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("refresh token expired");
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {

            //response status code
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        boolean isExist = memberRepository.existsByRefreshToken(refresh);

        if (!isExist) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid refresh token");
        }

        String email = jwtUtil.getEmail(refresh);
        String role = jwtUtil.getRole(refresh);
        Member member = memberRepository.findByEmailAndWithDrawalStatus(email,
                WithDrawalStatus.ACTIVE)
            .orElseThrow(
                MemberNotFoundException::new);

        //make new JWT
        String newAccess = jwtUtil.createJwt("access", email, member.getRole(), 600000L,
            member.getId());
        String newRefresh = jwtUtil.createJwt("refresh", email, member.getRole(), 86400000L,
            member.getId());

        member.updateRefreshToken(newRefresh);
        memberRepository.save(member);

        //response
        response.setHeader("Authorization","Bearer " + newAccess);
        response.addCookie(createCookie("refresh", newRefresh));
        return ResponseEntity.ok().build();
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "None"); // 이 속성 추가
        cookie.setHttpOnly(true);
        return cookie;
    }
}
