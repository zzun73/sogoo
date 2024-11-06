package com.ssafy.c107.main.domain.members.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BuyerReviewDto {

    private Long reviewId;
    private String reviewComment;
    private String reviewImg;
}
