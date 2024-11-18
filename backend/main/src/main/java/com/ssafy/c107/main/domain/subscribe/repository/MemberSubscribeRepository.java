package com.ssafy.c107.main.domain.subscribe.repository;

import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.entity.PaymentStatus;
import com.ssafy.c107.main.domain.subscribe.entity.Subscribe;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberSubscribeRepository extends JpaRepository<MemberSubscribe, Long> {

    List<MemberSubscribe> findAllByMember_IdAndStatus(Long memberId, SubscribeStatus status);

    Optional<MemberSubscribe> findByMember_Id(Long memberId);

    @Query("SELECT COALESCE(COUNT(o), 0) FROM MemberSubscribe o WHERE o.subscribe.store.id = :storeId AND o.status IN :statuses")
    Long getSubscribeMembers(Long storeId, @Param("statuses") List<SubscribeStatus> statuses);

    @Query("SELECT COALESCE(COUNT(o), 0) FROM MemberSubscribe o WHERE o.subscribe.id = :subscribeId AND o.status IN :statuses")
    Long getCountSubscribes(Long subscribeId, @Param("statuses") List<SubscribeStatus> statuses);

    @Query("SELECT ms FROM MemberSubscribe ms " +
            "JOIN FETCH ms.member m " +
            "JOIN FETCH ms.subscribe s " +
            "WHERE ms.status = :status AND ms.paymentStatus = :paymentStatus")
    List<MemberSubscribe> findActiveSubscriptions(@Param("status") SubscribeStatus status, @Param("paymentStatus") PaymentStatus paymentStatus);

    Optional<MemberSubscribe> findByMember_IdAndSubscribe_Id(Long memberId, Long subscribeId);

    @Query("SELECT ms FROM MemberSubscribe ms " +
            "JOIN FETCH ms.member " +
            "JOIN FETCH ms.subscribe " +
            "WHERE ms.status = :status AND ms.endDate < :endDate")
    List<MemberSubscribe> findAllByStatusAndEndDateBefore(@Param("status") SubscribeStatus status, @Param("endDate") LocalDateTime endDate);

    Optional<MemberSubscribe> findByIdAndMember_Id(Long memberSubscribeId, Long memberId);
}
