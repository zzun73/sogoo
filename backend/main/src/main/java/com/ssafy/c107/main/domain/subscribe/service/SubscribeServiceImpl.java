package com.ssafy.c107.main.domain.subscribe.service;

import com.ssafy.c107.main.domain.food.dto.FoodDto;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.subscribe.dto.SubscribeDetailDto;
import com.ssafy.c107.main.domain.subscribe.dto.SubscribeWeekDto;
import com.ssafy.c107.main.domain.subscribe.dto.response.GetSubscribeResponse;
import com.ssafy.c107.main.domain.subscribe.entity.Subscribe;
import com.ssafy.c107.main.domain.subscribe.exception.SubscribeNotFoundException;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService {
    private final SubscribeRepository subscribeRepository;

    @Transactional(readOnly = true)
    public GetSubscribeResponse getSubscribe(Long id) {
        // 조인 쿼리를 사용해 구독 상품과 연관된 모든 데이터를 한 번에 가져옴.
        Subscribe subscribe = subscribeRepository.findSubscribeWithDetails(id)
                .orElseThrow(SubscribeNotFoundException::new);

        // SubscribeDetailDto 생성 및 기본 정보 설정
        SubscribeDetailDto subscribeDetailDto = new SubscribeDetailDto();
        subscribeDetailDto.setSubscribeId(subscribe.getId());
        subscribeDetailDto.setSubscribeName(subscribe.getName());
        subscribeDetailDto.setSubscribePrice(subscribe.getPrice());
        subscribeDetailDto.setSubscribeDescription(subscribe.getDescription());
        subscribeDetailDto.setSubscribeRate(subscribe.getRate());

        // 주차별 구독 정보 설정
        List<SubscribeWeekDto> subscribeWeeks = subscribe.getSubscribeWeeks()
                .stream()
                .map(subscribeWeek -> {
                    SubscribeWeekDto subscribeWeekDto = new SubscribeWeekDto();
                    subscribeWeekDto.setSubscribeDate(subscribeWeek.getDate().toString());
                    subscribeWeekDto.setSubscribeRound(subscribeWeek.getRound());

                    // 주차별 반찬 정보 설정
                    List<FoodDto> foodDtos = subscribeWeek.getWeeklyFoods()
                            .stream()
                            .map(weeklyFood -> {
                                FoodDto foodDto = new FoodDto();
                                foodDto.setFoodId(weeklyFood.getFood().getId());
                                foodDto.setFoodName(weeklyFood.getFood().getName());
                                foodDto.setFoodDescription(weeklyFood.getFood().getDescription());
                                foodDto.setFoodImg(weeklyFood.getFood().getImg());
                                return foodDto;
                            }).collect(Collectors.toList());

                    subscribeWeekDto.setFoods(foodDtos);
                    return subscribeWeekDto;
                }).collect(Collectors.toList());

        // 주차별 구독 정보 리스트 설정
        subscribeDetailDto.setWeeklyFood(subscribeWeeks);

        // 최종 응답 Dto 생성
        GetSubscribeResponse getSubscribeResponse = new GetSubscribeResponse();
        getSubscribeResponse.setSubscribes(List.of(subscribeDetailDto));

        return getSubscribeResponse;
    }
}
