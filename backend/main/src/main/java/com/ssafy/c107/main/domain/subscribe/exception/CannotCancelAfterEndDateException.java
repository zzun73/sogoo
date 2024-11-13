package com.ssafy.c107.main.domain.subscribe.exception;

import lombok.Getter;

@Getter
public class CannotCancelAfterEndDateException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberSubscribeException.CANNOT_CANCEL_AFTER_END_DATE.getMessage();
    }

    public int getStatus() {
        return MemberSubscribeException.CANNOT_CANCEL_AFTER_END_DATE.getCode();
    }
}