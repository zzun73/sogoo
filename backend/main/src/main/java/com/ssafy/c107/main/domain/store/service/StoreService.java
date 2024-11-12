package com.ssafy.c107.main.domain.store.service;

import com.ssafy.c107.main.domain.store.dto.GetStoreDto;
import com.ssafy.c107.main.domain.store.dto.request.AddStoreRequest;
import com.ssafy.c107.main.domain.store.dto.response.GetStoreResponse;
import com.ssafy.c107.main.domain.store.dto.response.SellerStoresResponse;

public interface StoreService {

    GetStoreResponse getAllStores(int page);

    GetStoreDto getStoreById(Long id);

    void addStore(AddStoreRequest addStoreRequest, Long userId);

    SellerStoresResponse getAllSellerStores(Long userId);
}
