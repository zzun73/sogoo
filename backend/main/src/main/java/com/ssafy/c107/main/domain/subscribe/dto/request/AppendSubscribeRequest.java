package com.ssafy.c107.main.domain.subscribe.dto.request;

import com.ssafy.c107.main.domain.subscribe.dto.SubscribeProductsDto;
import lombok.Data;

import java.util.List;

@Data
public class AppendSubscribeRequest {
    private String subscribeName;
    private String subscribeDescription;
    private int subscribeRate;
    private int subscribePrice;
    List<SubscribeProductsDto> subscribeProducts;
}
