package com.ssafy.c107.main.domain.subscribe.entity;

import com.ssafy.c107.main.common.entity.BaseEntity;
import com.ssafy.c107.main.domain.store.entity.Store;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    private int rate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToMany(mappedBy = "subscribe", fetch = FetchType.LAZY)
    private Set<SubscribeWeek> subscribeWeeks = new HashSet<>();

    @Builder
    public Subscribe(String name, int price, String description, int rate, Store store, Set<SubscribeWeek> subscribeWeeks) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.rate = rate;
        this.store = store;

        if(subscribeWeeks != null) {
            for(SubscribeWeek subscribeWeek : subscribeWeeks) {
                addSubscribeWeek(subscribeWeek);
            }
        }
    }

    // 연관 관계 편의 메서드
    public void addSubscribeWeek(SubscribeWeek subscribeWeek) {
        this.subscribeWeeks.add(subscribeWeek);
        subscribeWeek.setSubscribeWithoutSetter(this); // setter를 사용하지 않고 관계 설정
    }
}
