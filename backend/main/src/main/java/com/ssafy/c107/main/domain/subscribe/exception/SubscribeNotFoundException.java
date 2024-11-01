package com.ssafy.c107.main.domain.subscribe.exception;

public class SubscribeNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return SubscribeException.SUBSCRIBE_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return SubscribeException.SUBSCRIBE_NOT_FOUND.getCode();
    }
}
