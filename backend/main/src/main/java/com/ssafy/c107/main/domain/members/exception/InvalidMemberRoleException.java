package com.ssafy.c107.main.domain.members.exception;

public class InvalidMemberRoleException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberException.INVALID_MEMBER_ROLE.getMessage();
    }

    public int getStatus(){
        return MemberException.INVALID_MEMBER_ROLE.getCode();
    }
}
