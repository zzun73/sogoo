package com.ssafy.c107.main.domain.order.repository;

import com.ssafy.c107.main.domain.order.entity.DeliveryStatus;
import com.ssafy.c107.main.domain.order.entity.Order;
import com.ssafy.c107.main.domain.order.entity.OrderType;
import java.time.LocalDateTime;
import java.util.List;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByMember_IdOrderByCreatedAtDesc(Long memberId);

    @Query("SELECT COALESCE(SUM(o.price), 0) FROM Order o WHERE CAST(o.createdAt AS date) = CURRENT_DATE AND o.store.id = :storeId")
    int getTodayTotalPriceByStore(Long storeId);

    @Query("SELECT COALESCE(COUNT(o), 0) FROM Order o WHERE CAST(o.createdAt AS date) = CURRENT_DATE AND o.store.id = :storeId")
    int getTodayOrderCountByStore(Long storeId);

    @Query(
        "SELECT to_char(o.createdAt, 'YYYY-MM') as yearMonth, SUM(o.price) as total " +
            "FROM Order o " +
            "WHERE o.createdAt >= :startDate " +
            "AND o.store.id = :storeId " +
            "GROUP BY to_char(o.createdAt, 'YYYY-MM') ")
    List<Object[]> findMonthlySumForLastYear(
        @Param("startDate") LocalDateTime startDate,
        @Param("storeId") Long storeId
    );

    @Query("SELECT o "
        + "FROM Order o "
        + "WHERE o.orderType = :orderType " +
        "AND DATE_TRUNC('day', o.createdAt) = DATE_TRUNC('day', CURRENT_TIMESTAMP)"
        + "AND o.store.id = :storeId ")
    List<Order> findByOrderTypeAndCreatedAtToday(@Param("orderType") OrderType orderType, @Param("storeId") Long storeId);

    List<Order> findByStore_IdAndDeliveryStatus(Long storeId, DeliveryStatus deliveryStatus);
}
