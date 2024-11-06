package com.ssafy.c107.main.domain.elasticsearch.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchDetail {

    private Long storeId;
    private String storeName;
    private String storeAddress;
    private String storeDescription;
    private String storeImg;
    private List<FoodInfoDetail> foods;
}
