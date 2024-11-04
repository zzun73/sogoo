package com.ssafy.c107.main.domain.store.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerStoreDto {

    private Long storeId;
    private String storeName;
}
