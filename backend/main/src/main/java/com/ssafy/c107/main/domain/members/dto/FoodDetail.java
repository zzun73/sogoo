package com.ssafy.c107.main.domain.members.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodDetail {

    private Long foodId;
    private String foodName;
    private String foodDescription;
    private int price;
    private String foodImg;
}
