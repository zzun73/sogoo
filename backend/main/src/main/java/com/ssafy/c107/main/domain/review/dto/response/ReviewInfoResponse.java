package com.ssafy.c107.main.domain.review.dto.response;

import lombok.Data;

@Data
public class ReviewInfoResponse {
    private long reviewCount;
    private long positiveCount;
    private long negativeCount;
    private String summary;
}
