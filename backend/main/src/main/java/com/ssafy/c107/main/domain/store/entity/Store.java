package com.ssafy.c107.main.domain.store.entity;

import com.ssafy.c107.main.common.entity.BaseEntity;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.members.entity.Member;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "Store")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Store extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String description;

    private String img;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Food> foods = new ArrayList<>();

    public void addFood(Food food) {
        this.foods.add(food);
        if (food.getStore() != this) {
            food.setStore(this);
        }
    }

    @Builder
    public Store(String name, String address, String description, String img, String summary,
        Member member) {
        this.name = name;
        this.address = address;
        this.description = description;
        this.img = img;
        this.summary = summary;
        this.member = member;
    }

    // summary 업데이트 메서드 추가
    public void updateSummary(String summary) {
        this.summary = summary;
    }
}
