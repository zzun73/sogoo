package com.ssafy.c107.main.domain.members.service;


import com.ssafy.c107.main.common.aws.FileService;
import com.ssafy.c107.main.domain.food.entity.Food;
import com.ssafy.c107.main.domain.members.dto.BuyerReviewDto;
import com.ssafy.c107.main.domain.members.dto.response.BuyerResponse;
import com.ssafy.c107.main.domain.members.dto.response.FoodTradesResponse;
import com.ssafy.c107.main.domain.members.dto.response.ReviewsResponse;
import com.ssafy.c107.main.domain.members.dto.response.SubscribesResponse;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.entity.WithDrawalStatus;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import com.ssafy.c107.main.domain.order.entity.DeliveryStatus;
import com.ssafy.c107.main.domain.order.entity.Order;
import com.ssafy.c107.main.domain.order.entity.OrderList;
import com.ssafy.c107.main.domain.order.repository.OrderListRepository;
import com.ssafy.c107.main.domain.order.repository.OrderRepository;
import com.ssafy.c107.main.domain.review.entity.Review;
import com.ssafy.c107.main.domain.review.repository.ReviewRepository;
import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.entity.Subscribe;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class BuyerServiceImpl implements BuyerService {

    private final MemberRepository memberRepository;
    private final MemberSubscribeRepository memberSubscribeRepository;
    private final OrderRepository orderRepository;
    private final OrderListRepository orderListRepository;
    private final ReviewRepository reviewRepository;
    private final FileService fileService;

    @Override
    public BuyerResponse getBuyerMyPage(Long userid) {
        //사용자 정보 가져오기
        Member member = memberRepository.findByIdAndWithDrawalStatus(userid,
                WithDrawalStatus.ACTIVE).orElseThrow(
                MemberNotFoundException::new);

        //사용자 구독정보 가져오기
        List<SubscribesResponse> subscribes = new ArrayList<>();

        //구독중
        List<MemberSubscribe> memberSubscribes = memberSubscribeRepository.findAllByMember_IdAndStatus(
                member.getId(),
                SubscribeStatus.SUBSCRIBE);
        for (MemberSubscribe memberSubscribe : memberSubscribes) {
            Subscribe subscribe = memberSubscribe.getSubscribe();
            subscribes.add(SubscribesResponse
                    .builder()
                    .subscribeId(memberSubscribe.getId())
                    .subscribeName(subscribe.getName())
                    .subscribePrice(subscribe.getPrice())
                    .storeId(subscribe.getStore().getId())
                    .storeName(subscribe.getStore().getName())
                    .storeImg(fileService.getAppropriateFileUrl(subscribe.getStore().getImg()))
                    .subscriptionActive(true)
                    .build());
        }

        //취소예정
        List<MemberSubscribe> cancelScheduledSubscribes = memberSubscribeRepository.findAllByMember_IdAndStatus(
                member.getId(),
                SubscribeStatus.CANCEL_SCHEDULE);
        for (MemberSubscribe memberSubscribe : cancelScheduledSubscribes) {
            Subscribe subscribe = memberSubscribe.getSubscribe();
            subscribes.add(SubscribesResponse
                    .builder()
                    .subscribeId(memberSubscribe.getId())
                    .storeName(subscribe.getStore().getName())
                    .subscribeName(subscribe.getName())
                    .subscribePrice(subscribe.getPrice())
                    .storeId(subscribe.getStore().getId())
                    .storeImg(fileService.getAppropriateFileUrl(subscribe.getStore().getImg()))
                    .subscriptionActive(false)
                    .build());
        }

        //사용자 반찬구매 내역 가져오기
        //사용자 리뷰 가져오기
        List<FoodTradesResponse> foodTrades = new ArrayList<>();
        List<ReviewsResponse> reviews = new ArrayList<>();

        List<Order> orders = orderRepository.findAllByMember_IdOrderByCreatedAtDesc(
                member.getId());

        for (Order order : orders) {
            List<OrderList> orderLists = orderListRepository.findAllByOrder_Id(order.getId());
            for (OrderList orderList : orderLists) {
                Food food = orderList.getFood();
                foodTrades.add(FoodTradesResponse
                    .builder()
                    .foodId(food.getId())
                    .foodName(food.getName())
                    .foodImg(fileService.getAppropriateFileUrl(food.getImg()))
                    .price(orderList.getCount() * food.getPrice())
                    .storeId(food.getStore().getId())
                    .storeName(food.getStore().getName())
                    .orderStatus(order.getDeliveryStatus() == DeliveryStatus.BEFORE_DELIVERY ? "배송중"
                        : "배송완료")
                    .build());

                //주문 목록중에 리뷰를 판별해서 넣어줌
                Optional<Review> or = reviewRepository.findByOrderList_Id(orderList.getId());

                //리뷰가 써진 경우
                if (or.isPresent()) {
                    Review review = or.get();
                    reviews.add(ReviewsResponse
                            .builder()
                            .foodId(food.getId())
                            .foodName(food.getName())
                            .foodImg(fileService.getAppropriateFileUrl(food.getImg()))
                            .reviewStatus(true)
                            .orderListId(orderList.getId())
                            .review(BuyerReviewDto
                                    .builder()
                                    .reviewComment(review.getComment())
                                    .reviewId(review.getId())
                                    .reviewImg(fileService.getAppropriateFileUrl(review.getImg()))
                                    .build())
                            .build());
                } else {
                    //리뷰가 없는데 구매일 7일 이내일 경우
                    if (isWithinSevenDays(orderList.getCreatedAt())) {
                        reviews.add(ReviewsResponse
                                .builder()
                                .foodId(food.getId())
                                .foodName(food.getName())
                                .foodImg(fileService.getAppropriateFileUrl(food.getImg()))
                                .reviewStatus(false)
                                .orderListId(orderList.getId())
                                .build());
                    }
                }
            }
        }

        return BuyerResponse
                .builder()
                .subscribes(subscribes)
                .foodTrades(foodTrades)
                .reviews(reviews)
                .build();
    }

    private boolean isWithinSevenDays(LocalDateTime createdAt) {
        LocalDateTime now = LocalDateTime.now();
        long daysBetween = ChronoUnit.DAYS.between(createdAt, now);
        return daysBetween >= 0 && daysBetween <= 7;
    }
}
