package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    @Override
    public boolean emailCheck(String email) {
        return memberRepository.existsByEmail(email);
    }
}
