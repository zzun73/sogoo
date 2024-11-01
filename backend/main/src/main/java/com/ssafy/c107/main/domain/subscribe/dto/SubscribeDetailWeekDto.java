package com.ssafy.c107.main.domain.subscribe.dto;

import lombok.Data;

import java.util.List;

@Data
public class SubscribeDetailWeekDto {
    private String subscribeDate;
    private int subscribeRound;
    private List<String> foodImgs;
}
