package com.ssafy.c107.main.domain.members.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubscribeDetail {

    private Long subscribeId;
    private String subscribeName;
    private String subscribeDescription;
    private int subscribePrice;
    private int subscribeBeforePrice;
}
