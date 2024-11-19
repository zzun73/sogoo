package com.ssafy.c107.main.domain.order.entity;

import com.ssafy.c107.main.common.entity.BaseEntity;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.store.entity.Store;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "OrderList")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderList extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int count;

    private int price;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "food_id")
    private Food food;

    public void setOrder(Order order) {
        this.order = order;
        if (order.getOrderLists().contains(this)) {
            order.getOrderLists().add(this);
        }
    }

    @Builder
    public OrderList(int count, int price, Order order, Food food) {
        this.count = count;
        this.price = price;
        this.order = order;
        this.food = food;
    }
}
