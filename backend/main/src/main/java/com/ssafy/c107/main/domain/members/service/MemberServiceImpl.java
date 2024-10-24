package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public boolean emailCheck(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Override
    public void signUp(Member member) {
        member.updatePassword(bCryptPasswordEncoder.encode(member.getPassword()));
        memberRepository.save(member);
    }
}
