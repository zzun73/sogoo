package com.ssafy.c107.main.domain.review.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewCountResponse {

    private int reviewCount;
}
