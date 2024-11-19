package com.ssafy.c107.main.domain.store.repository;

import com.ssafy.c107.main.domain.store.entity.Store;
import java.util.List;
import java.util.Optional;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StoreRepository extends JpaRepository<Store, Long> {

    @Query("SELECT s " +
            "FROM Store s " +
            "WHERE s.member.id = :memberId " +
            "ORDER BY s.id ASC")
    List<Store> findAllByMember_Id(@Param("userId") Long memberId);

    @Query("SELECT s "
        + "FROM Store s ")
    List<Store> findFoods();

    Optional<Store> findByMember_IdAndId(Long memberId, Long id);
}
