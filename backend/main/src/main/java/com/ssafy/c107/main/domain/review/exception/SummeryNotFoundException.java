package com.ssafy.c107.main.domain.review.exception;

public class SummeryNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return ReviewException.SUMMERY_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return ReviewException.SUMMERY_NOT_FOUND.getCode();
    }
}
