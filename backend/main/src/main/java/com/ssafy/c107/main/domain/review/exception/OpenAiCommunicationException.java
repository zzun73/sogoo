package com.ssafy.c107.main.domain.review.exception;

public class OpenAiCommunicationException extends RuntimeException {
    @Override
    public String getMessage() {
        return ReviewException.OPENAI_COMMUNICATION_ERROR.getMessage();
    }

    public int getStatus() {
        return ReviewException.OPENAI_COMMUNICATION_ERROR.getCode();
    }
}
