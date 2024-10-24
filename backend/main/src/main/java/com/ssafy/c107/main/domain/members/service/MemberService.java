package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.entity.Member;

public interface MemberService {

    boolean emailCheck(String email);

    void signUp(Member member);
}
