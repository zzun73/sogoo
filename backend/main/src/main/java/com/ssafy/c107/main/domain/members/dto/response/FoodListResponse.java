package com.ssafy.c107.main.domain.members.dto.response;

import com.ssafy.c107.main.domain.members.dto.FoodDetailDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoodListResponse {

    private List<FoodDetailDto> foods;

}
