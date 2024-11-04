package com.ssafy.c107.main.domain.store.repository;

import com.ssafy.c107.main.domain.store.entity.Store;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findAllByMember_Id(Long memberId);
}
