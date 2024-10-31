package com.ssafy.c107.main.domain.subscribe.entity;

import com.ssafy.c107.main.common.entity.BaseEntity;
import com.ssafy.c107.main.common.entity.WeeklyFood;
import com.ssafy.c107.main.domain.food.entity.Food;
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
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "SubscribeWeek")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SubscribeWeek extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private int round;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "subscribe_id")
    private Subscribe subscribe;

    @OneToMany(mappedBy = "subscribeWeek", fetch = FetchType.LAZY)
    private List<WeeklyFood> weeklyFoods = new ArrayList<>();

    @Builder
    public SubscribeWeek(LocalDate date, int round, LocalDate startDate, LocalDate endDate,Subscribe subscribe, List<WeeklyFood> weeklyFoods) {
        this.date = date;
        this.round = round;
        this.startDate = startDate;
        this.endDate = endDate;
        this.subscribe = subscribe;

        if(weeklyFoods != null) {
            this.weeklyFoods.addAll(weeklyFoods);
        }
    }

    void setSubscribeWithoutSetter(Subscribe subscribe) {
        this.subscribe = subscribe;
    }

    //연관 관계 편의 메서드: 주차별 반찬 추가
    public void addFoods(List<Food> foods) {
        List<WeeklyFood> weeklyFoods = foods.stream()
                .map(food -> WeeklyFood.builder()
                        .food(food)
                        .subscribeWeek(this)
                        .build()).collect(Collectors.toList());

        this.weeklyFoods.addAll(weeklyFoods);
    }
}
