package com.ssafy.c107.main.domain.elasticsearch.service;

import com.ssafy.c107.main.domain.elasticsearch.entity.StoreSearchDocument;
import com.ssafy.c107.main.domain.elasticsearch.entity.StoreSearchDocument.FoodInfo;
import com.ssafy.c107.main.domain.elasticsearch.repository.StoreSearchRepository;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import jakarta.annotation.PostConstruct;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ElasticSearchServiceImpl implements ElasticSearchService {

    private final StoreSearchRepository storeSearchRepository;
    private final StoreRepository storeRepository;

    @PostConstruct
    void postConstruct() {
        List<Store> stores = storeRepository.findFoods();
        for (Store store : stores) {
            List<Food> foods = store.getFoods();
            List<FoodInfo> foodInfo = foods.stream().map(food -> FoodInfo.builder()
                    .foodName(food.getName())
                    .price(food.getPrice())
                    .description(food.getDescription())
                    .build())
                .toList();

            StoreSearchDocument document = StoreSearchDocument.builder()
                .id(store.getId())
                .storeName(store.getName())
                .address(store.getAddress())
                .description(store.getDescription())
                .img(store.getImg())
                .foods(foodInfo)
                .build();

            storeSearchRepository.save(document);
        }
    }
}
