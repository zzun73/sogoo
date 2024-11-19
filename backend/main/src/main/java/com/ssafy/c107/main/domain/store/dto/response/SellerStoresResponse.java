package com.ssafy.c107.main.domain.store.dto.response;

import com.ssafy.c107.main.domain.store.dto.SellerStoreDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerStoresResponse {

    List<SellerStoreDto> stores;
}
