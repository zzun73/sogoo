package com.ssafy.c107.main.domain.members.service;


import com.ssafy.c107.main.domain.members.dto.response.BuyerResponse;
import com.ssafy.c107.main.domain.members.dto.response.FoodTradesResponse;
import com.ssafy.c107.main.domain.members.dto.response.ReviewsResponse;
import com.ssafy.c107.main.domain.members.dto.response.SubscribesResponse;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.entity.WithDrawalStatus;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BuyerServiceImpl implements BuyerService{

    private final MemberRepository memberRepository;

    @Override
    public BuyerResponse getBuyerMyPage(Long userid) {
        //사용자 정보 가져오기
        Member member = memberRepository.findByIdAndWithDrawalStatus(userid,
            WithDrawalStatus.ACTIVE).orElseThrow(
            MemberNotFoundException::new);

        //사용자 구독정보 가져오기
        List<SubscribesResponse> subscribes = new ArrayList<>();

        //사용자 반찬구매 내역 가져오기
        List<FoodTradesResponse> foodTrades = new ArrayList<>();

        //사용자 리뷰 가져오기
        List<ReviewsResponse> reviews = new ArrayList<>();

        return BuyerResponse
            .builder()
            .subscribes(subscribes)
            .foodTrades(foodTrades)
            .reviews(reviews)
            .build();
    }
}
