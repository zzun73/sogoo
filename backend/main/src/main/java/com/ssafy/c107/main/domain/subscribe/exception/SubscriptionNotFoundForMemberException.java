package com.ssafy.c107.main.domain.subscribe.exception;

public class SubscriptionNotFoundForMemberException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberSubscribeException.SUBSCRIPTION_NOT_FOUND_FOR_MEMBER.getMessage();
    }

    public int getStatus() {
        return MemberSubscribeException.SUBSCRIPTION_NOT_FOUND_FOR_MEMBER.getCode();
    }
}
