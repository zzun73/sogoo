package com.ssafy.c107.main.domain.store.service;

import com.ssafy.c107.main.domain.store.dto.GetStoreDto;
import com.ssafy.c107.main.domain.store.dto.request.AddStoreRequest;
import com.ssafy.c107.main.domain.store.dto.response.GetStoreResponse;

public interface StoreService {

    GetStoreResponse getAllStores();

    GetStoreDto getStoreById(Long id);

    void addStore(AddStoreRequest addStoreRequest);
}
