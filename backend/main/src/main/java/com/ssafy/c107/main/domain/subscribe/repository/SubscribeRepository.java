package com.ssafy.c107.main.domain.subscribe.repository;

import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.subscribe.entity.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    @Query("SELECT s FROM Subscribe s " +
            "JOIN FETCH s.subscribeWeeks sw " +   // Subscribe와 SubscribeWeek를 조인
            "JOIN FETCH sw.weeklyFoods wf " +     // SubscribeWeek와 WeeklyFood를 조인
            "JOIN FETCH wf.food f " +             // WeeklyFood와 Food를 조인
            "WHERE s.id = :id "
    )
    Optional<Subscribe> findSubscribeWithDetails(Long id);

    List<Subscribe> findByStore(Store store);
}
