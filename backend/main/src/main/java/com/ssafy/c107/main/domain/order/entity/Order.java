package com.ssafy.c107.main.domain.order.entity;

import com.ssafy.c107.main.common.entity.BaseEntity;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.store.entity.Store;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "orders")
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    private int price;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    List<OrderList> orderLists;

    public void addOrderList(OrderList orderList) {
        this.orderLists.add(orderList);
        if (orderList.getOrder() != this) {
            orderList.setOrder(this);
        }
    }

    @Builder
    public Order(OrderType orderType, int price, Member member, Store store,
        DeliveryStatus deliveryStatus) {
        this.orderType = orderType;
        this.price = price;
        this.member = member;
        this.store = store;
        this.deliveryStatus = deliveryStatus;
    }

    public void updateTotalPrice(int totalPrice) {
        this.price = totalPrice;
    }

    public void deliverSuccess() {
        this.deliveryStatus = DeliveryStatus.DELIVERY_COMPLETED;
    }
}
