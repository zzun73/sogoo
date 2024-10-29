package com.ssafy.c107.main.domain.members.repository;

import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.entity.WithDrawalStatus;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByRefreshToken(String refreshToken);

    Member findByRefreshToken(String refreshToken);

    Optional<Member> findByEmailAndWithDrawalStatus(String email, WithDrawalStatus withDrawalStatus);

    boolean existsByEmail(String email);

}
