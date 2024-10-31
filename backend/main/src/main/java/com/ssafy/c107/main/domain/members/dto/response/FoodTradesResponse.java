package com.ssafy.c107.main.domain.members.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodTradesResponse {

    private Long foodId;
    private String foodName;
    private String foodImg;
    private Long storeId;
    private String storeName;
    private int price;
    private String orderStatus;
}
