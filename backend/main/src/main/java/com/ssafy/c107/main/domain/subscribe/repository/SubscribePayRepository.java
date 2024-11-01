package com.ssafy.c107.main.domain.subscribe.repository;

import com.ssafy.c107.main.domain.subscribe.entity.SubscribePay;
import java.util.List;
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
    int findTodayTotalPaymentByStoreId(@Param("storeId") Long storeId);

    @Query(value = """
            SELECT 
                TO_CHAR(sp.created_at, 'YYYY-MM') AS year_month,
                SUM(s.price) as total_revenue
            FROM subscribe_pay sp
            JOIN member_subscribe ms ON sp.member_subscribe_id = ms.id
            JOIN subscribe s ON ms.subscribe_id = s.id
            WHERE s.store_id = :storeId
                AND sp.created_at >= NOW() - INTERVAL '1 year'
            GROUP BY TO_CHAR(sp.created_at, 'YYYY-MM')
            ORDER BY year_month DESC
            """, nativeQuery = true)
    List<Object[]> findMonthlyRevenueByStoreId(@Param("storeId") Long storeId);
}