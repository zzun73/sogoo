package com.ssafy.c107.main.domain.subscribe.repository;

import com.ssafy.c107.main.domain.subscribe.entity.SubscribePay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscribePayRepository extends JpaRepository<SubscribePay, Long> {

    @Query("SELECT COALESCE(SUM(s.price), 0) " +
        "FROM SubscribePay sp " +
        "JOIN sp.memberSubscribe ms " +
        "JOIN ms.subscribe s " +
        "WHERE s.store.id = :storeId " +
        "AND CAST(sp.createdAt AS date) = CURRENT_DATE")
        // DATE() 대신 CAST AS date 사용
    int findTodayTotalPaymentByStoreId(@Param("storeId") Long storeId);
}
