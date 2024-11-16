package com.ssafy.c107.main.domain.members.dto.response;

import com.ssafy.c107.main.domain.food.dto.FoodDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SellerReviewAllResponse {

    private Long storeId;
    private int positiveCnt;
    private int negativeCnt;
    private List<String> positiveLankList;
    private List<String> negativeLankList;
}
