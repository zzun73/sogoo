package com.ssafy.c107.main.domain.food.repository;

import com.ssafy.c107.main.domain.food.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {

}
