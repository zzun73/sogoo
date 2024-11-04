package com.ssafy.c107.main.domain.members.dto.response;

import com.ssafy.c107.main.domain.members.dto.ReviewChart;
import com.ssafy.c107.main.domain.members.dto.ReviewDetail;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewDetailResponse {

    private ReviewChart chart;
    List<ReviewDetail> reviews;
}
