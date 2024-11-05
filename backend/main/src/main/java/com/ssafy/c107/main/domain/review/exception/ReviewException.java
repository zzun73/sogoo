package com.ssafy.c107.main.domain.review.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ReviewException {

    MAX_UPLOAD_SIZE_EXCEEDED("파일 업로드 크기가 허용된 최대 용량을 초과했습니다.", HttpStatus.PAYLOAD_TOO_LARGE.value()),
    INVALID_ORDER_LIST("유효하지 않은 주문 목록 ID입니다.", HttpStatus.BAD_REQUEST.value()),
    REVIEW_NOT_FOUND("리뷰를 찾을수 없습니다.", HttpStatus.NOT_FOUND.value()),
    SUMMERY_NOT_FOUND("요약에 실패 했습니다.", HttpStatus.NOT_FOUND.value())
    ;

    private final String message;
    private final int code;

    ReviewException(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
