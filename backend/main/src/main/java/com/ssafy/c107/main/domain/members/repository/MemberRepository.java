package com.ssafy.c107.main.domain.members.repository;

import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.entity.WithDrawalStatus;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmailAndWithDrawalStatus(String email,
        WithDrawalStatus withDrawalStatus);

    boolean existsByEmail(String email);

    Optional<Member> findByIdAndWithDrawalStatus(Long id, WithDrawalStatus withDrawalStatus);

}
