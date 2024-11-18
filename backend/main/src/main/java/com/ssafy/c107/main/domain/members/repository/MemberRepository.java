package com.ssafy.c107.main.domain.members.repository;

import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.entity.WithDrawalStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmailAndWithDrawalStatus(String email,
        WithDrawalStatus withDrawalStatus);

    boolean existsByEmail(String email);

    Optional<Member> findByIdAndWithDrawalStatus(Long id, WithDrawalStatus withDrawalStatus);

    @Query("SELECT m "
        + "FROM Member m "
        + "JOIN FETCH m.orders o "
        + "JOIN FETCH o.store "
        + "WHERE m.range = :range")
    List<Member> findByMemberRange(@Param("range") int range);
}
