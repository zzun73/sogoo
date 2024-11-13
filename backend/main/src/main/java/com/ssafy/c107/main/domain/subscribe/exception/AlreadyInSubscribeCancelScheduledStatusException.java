package com.ssafy.c107.main.domain.subscribe.exception;

public class AlreadyInSubscribeCancelScheduledStatusException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberSubscribeException.ALREADY_IN_SUBSCRIBE_CANCEL_SCHEDULED_STATUS.getMessage();
    }

    public int getStatus() {
        return MemberSubscribeException.ALREADY_IN_SUBSCRIBE_CANCEL_SCHEDULED_STATUS.getCode();
    }
}