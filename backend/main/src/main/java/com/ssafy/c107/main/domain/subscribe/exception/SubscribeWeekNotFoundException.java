package com.ssafy.c107.main.domain.subscribe.exception;

public class SubscribeWeekNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return SubscribeWeekException.SUBSCRIBE_WEEK_NOT_FOUND_EXCEPTION.getMessage();
    }

    public int getStatus() {
        return SubscribeWeekException.SUBSCRIBE_WEEK_NOT_FOUND_EXCEPTION.getCode();
    }


}
