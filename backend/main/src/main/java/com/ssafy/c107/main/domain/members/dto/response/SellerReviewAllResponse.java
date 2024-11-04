package com.ssafy.c107.main.domain.members.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerReviewAllResponse {

    private Long storeId;
    private int positiveCnt;
    private int negativeCnt;
}
