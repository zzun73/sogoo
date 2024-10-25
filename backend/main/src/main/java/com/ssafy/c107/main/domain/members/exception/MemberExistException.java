package com.ssafy.c107.main.domain.members.exception;

public class MemberExistException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberException.MEMBER_IS_EXIST.getMessage();
    }

    public int getStatus() {
        return MemberException.MEMBER_IS_EXIST.getCode();
    }
}
