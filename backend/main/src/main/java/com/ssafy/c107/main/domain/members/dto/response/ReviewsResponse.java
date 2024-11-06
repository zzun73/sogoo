package com.ssafy.c107.main.domain.members.dto.response;

import com.ssafy.c107.main.domain.members.dto.BuyerReviewDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewsResponse {

    private Long foodId;
    private String foodName;
    private String foodImg;
    private String subscribeName;
    private boolean reviewStatus;
    private Long orderListId;
    private BuyerReviewDto review;
}
