package com.ssafy.c107.main.domain.review.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ReviewInterruptedException extends RuntimeException {
    // Throwable을 인자로 받는 생성자
    public ReviewInterruptedException(Throwable ex) {
        super(ex);
    }

    @Override
    public String getMessage() {
        return ReviewException.REVIEW_INTERRUPTED_ERROR.getMessage();
    }

    public int getStatus() {
        return ReviewException.REVIEW_INTERRUPTED_ERROR.getCode();
    }
}
