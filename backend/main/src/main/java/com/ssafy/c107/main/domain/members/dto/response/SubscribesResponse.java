package com.ssafy.c107.main.domain.members.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubscribesResponse {

    private Long subscribeId;
    private String subscribeName;
    private int subscribePrice;
    private Long storeId;
    private String storeName;
    private String storeImg;
    private boolean subscriptionActive;
}
