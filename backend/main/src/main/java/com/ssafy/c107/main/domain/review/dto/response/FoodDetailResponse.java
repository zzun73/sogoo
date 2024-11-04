package com.ssafy.c107.main.domain.review.dto.response;

import com.ssafy.c107.main.domain.review.dto.FoodReviewDto;
import lombok.Data;

import java.util.List;

@Data
public class FoodDetailResponse {
    private Long foodId;
    private String foodName;
    private int foodPrice;
    private String foodDescription;
    private String foodImg;
    private List<FoodReviewDto> reviews;
}
