package com.ssafy.c107.main.domain.review.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long reviewId;
    private String email;
    private String foodName;
    private String img;
    private String comment;
}
