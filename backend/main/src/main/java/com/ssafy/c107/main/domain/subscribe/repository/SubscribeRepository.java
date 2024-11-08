package com.ssafy.c107.main.domain.subscribe.repository;

import com.ssafy.c107.main.domain.subscribe.entity.Subscribe;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    @Query("SELECT s FROM Subscribe s " +
            "JOIN FETCH s.store st " +           // Subscribe와 Store를 조인
            "JOIN FETCH s.subscribeWeeks sw " +   // Subscribe와 SubscribeWeek를 조인
            "JOIN FETCH sw.weeklyFoods wf " +     // SubscribeWeek와 WeeklyFood를 조인
            "JOIN FETCH wf.food f " +             // WeeklyFood와 Food를 조인
            "WHERE st.id = :storeId "
    )
    Optional<Subscribe> findSubscribeWithDetailsByStoreId(Long storeId);

    List<Subscribe> findAllByStore_Id(Long id);

    @Query("SELECT coalesce(count(s), 0), s.price, s.name "
        + "FROM Subscribe s "
        + "JOIN MemberSubscribe ms on ms.subscribe = s "
        + "JOIN SubscribePay sp on sp.memberSubscribe = ms "
        + "WHERE s.store.id = :storeId "
        + "AND DATE_TRUNC('day', sp.createdAt) = DATE_TRUNC('day', CURRENT_TIMESTAMP) "
        + "group by s.id ")
    List<Object[]> getTodaySubscribeSales(@Param("storeId") Long storeId);
}
