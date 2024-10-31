package com.ssafy.c107.main.domain.store.controller;

import com.ssafy.c107.main.domain.store.dto.GetStoreDto;
import com.ssafy.c107.main.domain.store.dto.response.GetStoreResponse;
import com.ssafy.c107.main.domain.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/store")
@RequiredArgsConstructor
public class StoreController {
    private final StoreService storeService;

    //메인 페이지 조회
    @GetMapping
    public ResponseEntity<?> getAllStores() {
        GetStoreResponse stores = storeService.getAllStores();
        return ResponseEntity.ok(stores);
    }

    //반찬가게 상세페이지(반찬가게)
    @GetMapping("/{storeId}")
    public ResponseEntity<?> getStore(@PathVariable Long storeId) {
        GetStoreDto getStoreDto = storeService.getStoreById(storeId);
        return ResponseEntity.ok(getStoreDto);
    }
}
