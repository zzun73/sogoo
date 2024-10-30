package com.ssafy.c107.main.domain.order.repository;

import com.ssafy.c107.main.domain.order.entity.OrderList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderListRepository extends JpaRepository<OrderList, Long> {

}
