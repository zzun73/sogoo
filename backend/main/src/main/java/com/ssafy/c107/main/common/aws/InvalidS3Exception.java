package com.ssafy.c107.main.common.aws;

import lombok.Getter;

@Getter
public class InvalidS3Exception extends RuntimeException {
    private final S3Exception s3Exception;

    public InvalidS3Exception(S3Exception s3Exception) {
        super(s3Exception.getMessage());
        this.s3Exception = s3Exception;
    }

    public int getStatus() {
        return s3Exception.getCode();
    }
}