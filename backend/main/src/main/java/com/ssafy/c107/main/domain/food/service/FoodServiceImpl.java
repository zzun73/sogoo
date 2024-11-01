package com.ssafy.c107.main.domain.food.service;

import com.ssafy.c107.main.domain.food.dto.request.AppendFoodRequest;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.food.repository.FoodRepository;
import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.exception.StoreNotFoundException;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {
    private final FoodRepository foodRepository;
    private final StoreRepository storeRepository;

    // 개별 상품 추가
    public void appendFood(Long storeId,AppendFoodRequest request, String memberRole){
        // 판매자가 아닐경우 예외 처리
        if(memberRole.equals("Buyer")){
            throw new InvalidMemberRoleException();
        }

        // 가게 정보 불러오기
        Store store = storeRepository.findById(storeId)
                .orElseThrow(StoreNotFoundException::new);

        // food에 정보 등록
        Food food = Food.builder()
                .name(request.getData().getFoodName())
                .price(request.getData().getFoodPrice())
                .description(request.getData().getFoodDescription())
                .img(request.getImg())
                .store(store)
                .build();

        foodRepository.save(food);
    }
}
