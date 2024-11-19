package com.ssafy.c107.main.domain.subscribe.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.c107.main.common.entity.BaseEntity;
import com.ssafy.c107.main.common.entity.WeeklyFood;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "subscribeWeek", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<WeeklyFood> weeklyFoods = new ArrayList<>();

    @Builder
    public SubscribeWeek(LocalDate date, int round, LocalDate startDate, LocalDate endDate, Subscribe subscribe) {
        this.date = date;
        this.round = round;
        this.startDate = startDate;
        this.endDate = endDate;
        this.subscribe = subscribe;
    }

    public void addWeeklyFood(WeeklyFood food) {
        this.weeklyFoods.add(food);
    }
}
