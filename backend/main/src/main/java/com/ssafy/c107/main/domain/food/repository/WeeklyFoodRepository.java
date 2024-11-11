package com.ssafy.c107.main.domain.food.repository;

import com.ssafy.c107.main.common.entity.WeeklyFood;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WeeklyFoodRepository extends JpaRepository<WeeklyFood, Long> {

    @Query("SELECT wf FROM WeeklyFood wf " +
            "JOIN FETCH wf.food f " +
            "WHERE wf.subscribeWeek.id = :subscribeWeekId")
    List<WeeklyFood> findBySubscribeWeekId(@Param("subscribeWeekId") Long subscribeWeekId);
}