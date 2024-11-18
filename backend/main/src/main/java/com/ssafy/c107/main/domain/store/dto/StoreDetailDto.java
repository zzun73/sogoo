package com.ssafy.c107.main.domain.store.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StoreDetailDto {

    private Long storeId;
    private String storeName;
    private String storeImg;
    private String storeDescription;
}
