package com.ssafy.c107.main.domain.subscribe.repository;

import com.ssafy.c107.main.domain.subscribe.entity.SubscribeWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscribeWeekRepository extends JpaRepository<SubscribeWeek, Long> {

    @Query("SELECT sw FROM SubscribeWeek sw WHERE sw.subscribe.id = :subscribeId AND :nextDay BETWEEN sw.startDate AND sw.endDate")
    SubscribeWeek findNextWeek(@Param("subscribeId") Long subscribeId,@Param("nextDay") LocalDate nextDay);

    @Query("SELECT sw "
        + "FROM SubscribeWeek sw "
        + "JOIN FETCH sw.weeklyFoods wf "
        + "JOIN FETCH wf.food f "
        + "WHERE sw.id = :swId")
    Optional<SubscribeWeek> findBySwId(@Param("swId") Long swId);

    @Query("SELECT sw FROM SubscribeWeek sw " +
            "JOIN FETCH sw.subscribe s " +
            "WHERE s.id = :subscribeId AND sw.startDate = :startDate")
    List<SubscribeWeek> findBySubscribeIdAndStartDate(@Param("subscribeId") Long subscribeId,
                                                      @Param("startDate") LocalDate startDate);
}
