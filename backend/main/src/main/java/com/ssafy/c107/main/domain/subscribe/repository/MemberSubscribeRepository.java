package com.ssafy.c107.main.domain.subscribe.repository;

import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberSubscribeRepository extends JpaRepository<MemberSubscribe, Long> {
    List<MemberSubscribe> findAllByMember_IdAndStatus(Long memberId, SubscribeStatus status);

    @Query("SELECT COALESCE(COUNT(o), 0) FROM MemberSubscribe o WHERE o.subscribe.store.id = :storeId AND o.status IN :statuses")
    int getSubscribeMembers(Long storeId, @Param("statuses") List<SubscribeStatus> statuses);

    @Query("SELECT COALESCE(SUM(s.price), 0) " +
        "FROM MemberSubscribe ms " +
        "JOIN ms.subscribe s " +
        "WHERE s.store.id = :storeId " +
        "AND CAST(ms.recentPayDate AS date) = CURRENT_DATE")  // DATE() 대신 CAST AS date 사용
    int findTodayTotalPaymentByStoreId(@Param("storeId") Long storeId);
}
