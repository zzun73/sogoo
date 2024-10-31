package com.ssafy.c107.main.domain.store.dto;

import lombok.Data;

@Data
public class GetStoreDto {
    private Long storeId;
    private String name;
    private String description;
    private String img;
}
