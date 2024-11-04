package com.ssafy.c107.main.domain.order.exception;

public class OrderListNotFoundException extends RuntimeException{
    @Override
    public String getMessage() {
        return OrderListException.ORDER_LIST_NOT_FOUND_EXCEPTION.getMessage();
    }

    public int getStatus(){
        return OrderListException.ORDER_LIST_NOT_FOUND_EXCEPTION.getCode();
    }
}
