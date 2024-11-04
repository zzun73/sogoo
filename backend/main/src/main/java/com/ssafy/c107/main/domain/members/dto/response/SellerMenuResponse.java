package com.ssafy.c107.main.domain.members.dto.response;

import com.ssafy.c107.main.domain.members.dto.FoodDetail;
import com.ssafy.c107.main.domain.members.dto.SubscribeDetail;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerMenuResponse {

    List<SubscribeDetail> subscribes;
    List<FoodDetail> foods;
}
