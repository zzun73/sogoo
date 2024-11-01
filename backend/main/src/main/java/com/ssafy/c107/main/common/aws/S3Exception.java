package com.ssafy.c107.main.common.aws;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum S3Exception {
    FILE_UPLOAD_FAILED("파일 업로드에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()),
    FILE_NOT_FOUND("파일을 찾을 수 없습니다.", HttpStatus.NOT_FOUND.value()),
    FILE_DELETE_FAILED("파일 삭제에 실패했습니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()),
    INVALID_FILE_URL("잘못된 파일 URL입니다.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int code;

    S3Exception(String message, int code) {
        this.message = message;
        this.code = code;
    }
}
