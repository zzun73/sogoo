package com.ssafy.c107.main.domain.food.service;

import com.ssafy.c107.main.domain.food.dto.FoodAllDto;
import com.ssafy.c107.main.domain.food.dto.request.AppendFoodRequest;
import com.ssafy.c107.main.domain.food.dto.response.FoodAllResponse;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.food.repository.FoodRepository;
import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
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
public class FoodServiceImpl implements FoodService {
    private final FoodRepository foodRepository;
    private final StoreRepository storeRepository;

    // 개별 상품 추가
    public void appendFood(Long storeId,AppendFoodRequest request, String memberRole){
        // 구매자 접근 제한
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

    // 가게 전체 반찬 조회하기
    @Transactional(readOnly = true)
    public FoodAllResponse findAllFood(Long storeId, String memberRole){
        // 구매자 접근 제한
        if(memberRole.equals("Buyer")){
            throw new InvalidMemberRoleException();
        }

        // 반찬 가져오기
        FoodAllResponse response = getAllFood(storeId);
        return response;
    }

    // 반찬가게 상세페이지[구매자용](개별반찬)
    @Transactional(readOnly = true)
    public FoodAllResponse detailFoodAll(Long storeId, String memberRole){
        // 판매자 접근 제한
        if(memberRole.equals("Seller")){
            throw new InvalidMemberRoleException();
        }

        // 반찬 가져오기
        FoodAllResponse response = getAllFood(storeId);
        return response;
    }

    // 가게 전체 반찬 조회하기[판매자용], 반찬가게 상세페이지[구매자용](개별반찬) 반찬 가져오기
    public FoodAllResponse getAllFood(Long storeId){
        // 가게 조회
        Store store = storeRepository.findById(storeId)
                .orElseThrow(StoreNotFoundException::new);

        // 해당 가게에 포함된 반찬 조회
        List<Food> foods = foodRepository.findByStore(store);

        // FoodAllDto로 변환
        List<FoodAllDto> foodAllLists = foods.stream()
                .map(food -> {
                    FoodAllDto foodAllDto = new FoodAllDto();
                    foodAllDto.setFoodId(food.getId());
                    foodAllDto.setFoodName(food.getName());
                    foodAllDto.setFoodDescription(food.getDescription());
                    foodAllDto.setFoodPrice(food.getPrice());
                    foodAllDto.setFoodImg(food.getImg());
                    return foodAllDto;
                }).collect(Collectors.toList());

        // FoodAllResponse로 변환
        FoodAllResponse foodAllResponse = new FoodAllResponse();
        foodAllResponse.setFoods(foodAllLists);
        return foodAllResponse;
    }
}
