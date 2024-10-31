package com.ssafy.c107.main.domain.subscribe.repository;

import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberSubscribeRepository extends JpaRepository<MemberSubscribe, Long> {
    List<MemberSubscribe> findAllByMember_IdAndStatus(Long memberId, SubscribeStatus status);
}
