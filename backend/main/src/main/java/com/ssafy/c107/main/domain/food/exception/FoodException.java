package com.ssafy.c107.main.domain.food.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum FoodException {
    FOOD_NOT_FOUND("해당 반찬을 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int code;

    FoodException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
