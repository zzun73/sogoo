package com.ssafy.c107.main.domain.review.exception;

public class MaxUploadSizeExceededException extends RuntimeException {

    @Override
    public String getMessage() {
        return ReviewException.MAX_UPLOAD_SIZE_EXCEEDED.getMessage();
    }

    public int getStatus() {
        return ReviewException.MAX_UPLOAD_SIZE_EXCEEDED.getCode();
    }
}
