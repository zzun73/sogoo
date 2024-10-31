package com.ssafy.c107.main.domain.food.exception;

public class FoodNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return FoodException.FOOD_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return FoodException.FOOD_NOT_FOUND.getCode();
    }
}
