package com.ssafy.c107.main.domain.members.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NextWeekFood {

    private Long foodId;
    private String foodName;
    private int foodCnt;
}
