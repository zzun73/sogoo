package com.ssafy.c107.main.domain.review.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ReviewAnalysisProcessingException extends RuntimeException {
    public ReviewAnalysisProcessingException(Throwable ex) {
        super(ex);
    }

    @Override
    public String getMessage() {
        return ReviewException.REVIEW_ANALYSIS_PROCESSING_ERROR.getMessage();
    }

    public int getStatus() {
        return ReviewException.REVIEW_ANALYSIS_PROCESSING_ERROR.getCode();
    }
}
