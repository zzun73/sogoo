package com.ssafy.c107.main.domain.store.dto.response;

import com.ssafy.c107.main.domain.store.dto.StoreDetailDto;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StoreRecommendResponse {

    List<StoreDetailDto> stores;
}
