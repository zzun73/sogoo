package com.ssafy.c107.main.domain.review.dto.response;

import com.ssafy.c107.main.domain.review.dto.ReviewDto;
import lombok.Data;

import java.util.List;

@Data
public class StoreReviewResponse {
    private List<ReviewDto> reviews;
}
