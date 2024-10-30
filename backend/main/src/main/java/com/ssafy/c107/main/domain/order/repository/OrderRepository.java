package com.ssafy.c107.main.domain.order.repository;

import com.ssafy.c107.main.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
