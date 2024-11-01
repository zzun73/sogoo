package com.ssafy.c107.main.domain.food.entity;

import com.ssafy.c107.main.common.entity.BaseEntity;
import com.ssafy.c107.main.domain.store.entity.Store;
import jakarta.persistence.Column;
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
@Table(name = "Food")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Food extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int price;

    private String description;

    private String img;

    private String summary;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "store_id")
    private Store store;

    @Builder
    public Food(String name, int price, String description, String img, String summary, Store store) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.img = img;
        this.summary = summary;
        this.store = store;
    }
}
