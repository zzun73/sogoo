package com.ssafy.c107.main.domain.members.repository;

import com.ssafy.c107.main.domain.members.entity.Members;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembersRepository extends JpaRepository<Members, Long> {

    boolean existsByRefreshToken(String refreshToken);

    Members findByRefreshToken(String refreshToken);

    Members findByEmail(String email);

}
