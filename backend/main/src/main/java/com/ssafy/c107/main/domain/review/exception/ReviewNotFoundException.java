package com.ssafy.c107.main.domain.review.exception;

public class ReviewNotFoundException extends RuntimeException {
    @Override
    public String getMessage() {
        return ReviewException.REVIEW_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return ReviewException.REVIEW_NOT_FOUND.getCode();
    }
}
