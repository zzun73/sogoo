package com.ssafy.c107.main.domain.members.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDto {

    private String productName;
    private int salesSum;
    private Long price;
    private int productCnt;
}
