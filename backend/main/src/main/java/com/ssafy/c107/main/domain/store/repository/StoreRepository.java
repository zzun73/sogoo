package com.ssafy.c107.main.domain.store.repository;

import com.ssafy.c107.main.domain.store.entity.Store;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findAllByMember_Id(Long memberId);

    @Query("SELECT s "
        + "FROM Store s ")
    List<Store> findFoods();

    Optional<Store> findByMember_IdAndId(Long memberId, Long id);
}
