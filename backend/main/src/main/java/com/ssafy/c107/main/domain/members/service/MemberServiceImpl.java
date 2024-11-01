package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.repository.BusinessCertificationRepository;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final BusinessCertificationRepository businessCertificationRepository;

    @Override
    public boolean emailCheck(String email) {
        return memberRepository.existsByEmail(email);
    }

    @Override
    public void signUp(Member member) {
        member.updatePassword(bCryptPasswordEncoder.encode(member.getPassword()));
        memberRepository.save(member);
    }

    @Override
    @Transactional
    public void changeAddress(Long memberId, String address) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(MemberNotFoundException::new);
        member.updateAddress(address);
    }

    @Override
    public boolean sellerCheck(String sellerNumber) {
        return businessCertificationRepository.existsBySellerNumber(sellerNumber);
    }
}
