package com.ssafy.c107.main.domain.subscribe.dto;

import lombok.Data;

@Data
public class SubscribeAllDto {
    private Long subscribeId;
    private String subscribeName;
    private int subscribePrice;
    private int subscribeBeforePrice;
}
