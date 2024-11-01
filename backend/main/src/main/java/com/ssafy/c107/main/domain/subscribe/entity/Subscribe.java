package com.ssafy.c107.main.domain.subscribe.entity;

import com.ssafy.c107.main.common.entity.BaseEntity;
import com.ssafy.c107.main.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Table(name = "Subscribe")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Subscribe extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int price;

    private String description;

    private int beforePrice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToMany(mappedBy = "subscribe", fetch = FetchType.LAZY)
    private Set<SubscribeWeek> subscribeWeeks = new HashSet<>();

    @Builder
    public Subscribe(String name, int price, String description, int beforePrice, Store store) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.beforePrice = beforePrice;
        this.store = store;
    }
}
