package com.ssafy.c107.main.domain.members.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NextWeekQuantityResponse {

    private List<NextWeekFood> foods;
}
