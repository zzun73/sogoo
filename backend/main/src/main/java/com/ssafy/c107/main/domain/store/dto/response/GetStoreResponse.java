package com.ssafy.c107.main.domain.store.dto.response;

import com.ssafy.c107.main.domain.store.dto.GetStoreDto;
import lombok.Data;

import java.util.List;

@Data
public class GetStoreResponse {
    private List<GetStoreDto> stores;
}
