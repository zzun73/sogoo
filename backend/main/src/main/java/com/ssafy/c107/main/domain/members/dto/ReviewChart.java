package com.ssafy.c107.main.domain.members.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewChart {

    private int positiveCnt;
    private int negativeCnt;
    private String aiSummary;
}
