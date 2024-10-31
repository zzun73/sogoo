package com.ssafy.c107.main.common.entity;

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
import lombok.Builder;
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
    private SubscribeWeek subscribeWeek;

    // WeeklyFood 엔티티에 빌더 추가
    @Builder
    public WeeklyFood(Food food, SubscribeWeek subscribeWeek) {
        this.food = food;
        this.subscribeWeek = subscribeWeek;
    }

    // 연관 관계 설정을 위한 메서드 추가
    public void setSubscribeWeek(SubscribeWeek subscribeWeek) {
        this.subscribeWeek = subscribeWeek;
    }
}
