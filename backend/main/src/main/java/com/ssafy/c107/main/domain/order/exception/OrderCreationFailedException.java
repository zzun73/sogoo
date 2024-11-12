package com.ssafy.c107.main.domain.order.exception;

public class OrderCreationFailedException extends RuntimeException {

    @Override
    public String getMessage() {
        return OrderException.ORDER_CREATION_FAILED.getMessage();
    }

    public int getStatus() {
        return OrderException.ORDER_CREATION_FAILED.getCode();
    }
}