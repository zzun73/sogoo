package com.ssafy.c107.main.domain.members.repository;

import com.ssafy.c107.main.domain.members.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByRefreshToken(String refreshToken);

    Member findByRefreshToken(String refreshToken);

    Member findByEmail(String email);

}
