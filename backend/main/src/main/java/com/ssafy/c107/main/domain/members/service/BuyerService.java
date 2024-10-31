package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.dto.response.BuyerResponse;

public interface BuyerService {

    BuyerResponse getBuyerMyPage(Long userid);
}
