package com.ssafy.c107.main.domain.members.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SalesStatusResponse {

    private int todaySales;
    private int subscribePeopleCnt;
    private int todayTradeCnt;
}
