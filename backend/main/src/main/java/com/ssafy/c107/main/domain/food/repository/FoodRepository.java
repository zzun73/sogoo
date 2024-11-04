package com.ssafy.c107.main.domain.food.repository;

import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.store.entity.Store;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {

    // 특정 가게에 해당하는 모든 Food 가져오기
    List<Food> findByStore(Store store);

    Optional<Food> findById(Long id);

    Optional<Food> findByName(String name);

    List<Food> findAllByStore_Id(Long storeId);
}
