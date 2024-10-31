package com.ssafy.c107.main.domain.members.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BuyerResponse {

    private List<SubscribesResponse> subscribes;
    private List<FoodTradesResponse> foodTrades;
    private List<ReviewsResponse> reviews;
}
