package com.ssafy.c107.main.domain.subscribe.dto;

import lombok.Data;

import java.util.List;

@Data
public class SubscribeDetailDto {
    private Long subscribeId;
    private String subscribeName;
    private int subscribePrice;
    private String subscribeDescription;
    private int subscribeBeforePrice;
    private List<SubscribeWeekDto> weeklyFood;
}
