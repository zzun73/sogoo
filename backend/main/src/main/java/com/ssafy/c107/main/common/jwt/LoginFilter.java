package com.ssafy.c107.main.common.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.entity.WithDrawalStatus;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.transaction.annotation.Transactional;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private MemberRepository memberRepository;
    private final JWTUtil jwtUtil;
    private final ObjectMapper objectMapper;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil,
        MemberRepository memberRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.memberRepository = memberRepository;
        this.objectMapper = new ObjectMapper();
        setFilterProcessesUrl("/member/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
        HttpServletResponse response) throws AuthenticationException {

        String email;
        String password;

        try {
            // JSON 요청 본문을 Map으로 파싱
            Map<String, String> jsonRequest = objectMapper.readValue(request.getInputStream(), Map.class);
            email = jsonRequest.get("email");
            password = jsonRequest.get("password");
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse authentication request body", e);
        }

        //스프링 시큐리티에서 username과 password를 검증하기 위해서는 token에 담아야함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            email, password, null);

        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드(여기서 jwt 발급)
    @Transactional
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, FilterChain chain, Authentication authentication) {
        //유저 정보
        String email = authentication.getName();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        Member member = memberRepository.findByEmailAndWithDrawalStatus(email,
            WithDrawalStatus.ACTIVE).orElseThrow(
            MemberNotFoundException::new);

        //토큰 생성
        String access = jwtUtil.createJwt("access", email, member.getRole(), 1800000L,
            member.getId());
        String refresh = jwtUtil.createJwt("refresh", email, member.getRole(), 86400000L,
            member.getId());

        System.out.println("role : " + role.toString());

        member.updateRefreshToken(refresh);
        memberRepository.save(member);

        //응답 생성
        response.setHeader("Authorization", "Bearer " + access);
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
        response.setContentType("application/json");
    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
        HttpServletResponse response, AuthenticationException failed) {
        response.setStatus(401);
        response.setContentType("application/json");
    }

    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "None");
        cookie.setHttpOnly(true);
        return cookie;
    }
}