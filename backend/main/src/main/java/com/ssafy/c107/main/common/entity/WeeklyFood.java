package com.ssafy.c107.main.common.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeWeek;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "WeeklyFood")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class WeeklyFood extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subscribe_week_id")
    @JsonBackReference
    private SubscribeWeek subscribeWeek;

    // 연관관계 편의 메서드 추가
    public WeeklyFood(Food food, SubscribeWeek subscribeWeek) {
        this.food = food;
        this.subscribeWeek = subscribeWeek;
        subscribeWeek.addWeeklyFood(this);
    }
}
