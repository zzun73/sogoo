package com.ssafy.c107.main.domain.review.exception;

public class FastApiCommunicationException extends RuntimeException {
    @Override
    public String getMessage() {
        return ReviewException.FASTAPI_COMMUNICATION_ERROR.getMessage();
    }

    public int getStatus() {
        return ReviewException.FASTAPI_COMMUNICATION_ERROR.getCode();
    }
}
