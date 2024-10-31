package com.ssafy.c107.main.domain.subscribe.dto;

import lombok.Data;

import java.util.List;

@Data
public class SubscribeProductsDto {
    private String subscribeDate;
    private int subscribeRound;
    List<Integer> subscribeFood;
}
