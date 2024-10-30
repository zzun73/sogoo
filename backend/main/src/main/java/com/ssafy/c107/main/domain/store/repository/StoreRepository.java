package com.ssafy.c107.main.domain.store.repository;

import com.ssafy.c107.main.domain.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {

}
