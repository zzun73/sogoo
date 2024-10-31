package com.ssafy.c107.main.domain.store.service;

import com.ssafy.c107.main.domain.store.dto.GetStoreDto;
import com.ssafy.c107.main.domain.store.dto.response.GetStoreResponse;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.exception.StoreNotFoundException;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;

    //메인 페이지 조회
    @Transactional(readOnly = true)
    public GetStoreResponse getAllStores() {
        List<Store> getStores = storeRepository.findAll();

        if(getStores.isEmpty()) {
            throw new StoreNotFoundException();
        }

        List<GetStoreDto> stores = getStores.stream().map(store -> {
            GetStoreDto dto = new GetStoreDto();
            dto.setStoreId(store.getId());
            dto.setName(store.getName());
            dto.setDescription(store.getDescription());
            dto.setImg(store.getImg());
            return dto;
        }).collect(Collectors.toList());

        GetStoreResponse getStoreResponse = new GetStoreResponse();
        getStoreResponse.setStores(stores);
        return getStoreResponse;
    }

    //반찬가게 상세페이지(반찬가게)
    @Transactional(readOnly = true)
    public GetStoreDto getStoreById(Long id) {
        Store store = storeRepository.findById(id).orElseThrow(StoreNotFoundException::new);

        GetStoreDto dto = new GetStoreDto();
        dto.setStoreId(store.getId());
        dto.setName(store.getName());
        dto.setDescription(store.getDescription());
        dto.setImg(store.getImg());

        return dto;
    }
}
