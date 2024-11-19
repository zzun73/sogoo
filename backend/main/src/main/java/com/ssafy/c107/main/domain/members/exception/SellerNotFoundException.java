package com.ssafy.c107.main.domain.members.exception;

public class SellerNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberException.SELLER_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return MemberException.SELLER_NOT_FOUND.getCode();
    }
}
