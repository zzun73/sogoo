package com.ssafy.c107.main.domain.review.exception;

public class InvalidOrderListException extends RuntimeException {

    @Override
    public String getMessage() {
        return ReviewException.INVALID_ORDER_LIST.getMessage();
    }

    public int getStatus() {
        return ReviewException.INVALID_ORDER_LIST.getCode();
    }
}
