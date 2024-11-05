package com.ssafy.c107.main.domain.members.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodDetailDto {

    private Long foodId;
    private String foodName;
}
