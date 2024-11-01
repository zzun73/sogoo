package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.dto.response.MonthlySalesResponse;
import com.ssafy.c107.main.domain.members.dto.response.SalesStatusResponse;
import com.ssafy.c107.main.domain.order.repository.OrderRepository;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import com.ssafy.c107.main.domain.subscribe.repository.SubscribePayRepository;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final OrderRepository orderRepository;
    private final MemberSubscribeRepository memberSubscribeRepository;
    private final SubscribePayRepository subscribePayRepository;

    @Override
    public SalesStatusResponse getSalesStatus(Long storeId) {
        //주문 거래금액 가져오기
        int todayOrderPrice = orderRepository.getTodayTotalPriceByStore(storeId);

        //구독 거래금액 가져오기
        int todaySubscribePrice = subscribePayRepository.findTodayTotalPaymentByStoreId(storeId);

        //주문 수량 가져오기
        int todayOrderCount = orderRepository.getTodayOrderCountByStore(storeId);

        //구독자 수 가져오기
        List<SubscribeStatus> statuses = Arrays.asList(SubscribeStatus.SUBSCRIBE,
            SubscribeStatus.CANCEL_SCHEDULE);
        int subscribeCount = memberSubscribeRepository.getSubscribeMembers(storeId, statuses);

        return SalesStatusResponse
            .builder()
            .todaySales(todayOrderPrice + todaySubscribePrice)
            .todayTradeCnt(todayOrderCount)
            .subscribePeopleCnt(subscribeCount)
            .build();
    }

    @Override
    public MonthlySalesResponse getMonthlySales(Long storeId) {
        // 1. 해당 가게의 월별 금액 가져오기
        // 1-1. 개별 반찬 금액 가져오기
        LocalDateTime startDate = LocalDateTime.now().minusYears(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM", Locale.ENGLISH);
        List<Object[]> monthlySumForLastYear = orderRepository.findMonthlySumForLastYear(startDate,
            storeId);

        Map<String, Long> map = new HashMap<>();

        for (Object[] result : monthlySumForLastYear) {
            YearMonth ym = YearMonth.parse((String) result[0]);
            String monthName = ym.format(formatter);
            Long total = ((Number) result[1]).longValue();

            map.put(monthName, total);
        }

        // 1-2. 구독 금액 가져오기


        return null;
    }

}
