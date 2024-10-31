package com.ssafy.c107.main.domain.order.repository;

import com.ssafy.c107.main.domain.order.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByMember_IdOrderByCreatedAtDesc(Long memberId);

    @Query("SELECT COALESCE(SUM(o.price), 0) FROM Order o WHERE CAST(o.createdAt AS date) = CURRENT_DATE AND o.store.id = :storeId")
    int getTodayTotalPriceByStore(Long storeId);

    @Query("SELECT COALESCE(COUNT(o), 0) FROM Order o WHERE CAST(o.createdAt AS date) = CURRENT_DATE AND o.store.id = :storeId")
    int getTodayOrderCountByStore(Long storeId);
}
