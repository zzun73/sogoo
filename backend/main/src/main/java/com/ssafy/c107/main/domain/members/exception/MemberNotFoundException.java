package com.ssafy.c107.main.domain.members.exception;

public class MemberNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberException.MEMBER_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return MemberException.MEMBER_NOT_FOUND.getCode();
    }

}
