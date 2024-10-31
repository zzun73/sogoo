package com.ssafy.c107.main.domain.subscribe.dto.response;

import com.ssafy.c107.main.domain.subscribe.dto.SubscribeDetailWeekDto;
import lombok.Data;

import java.util.List;

@Data
public class SubscribeDetailResponse {
    private Long subscribeId;
    private String subscribeName;
    private int subscribePrice;
    private String subscribeDescription;
    private int subscribeRate;
    private List<SubscribeDetailWeekDto> subscribeProducts;
}
