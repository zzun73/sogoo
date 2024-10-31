package com.ssafy.c107.main.domain.subscribe.service;

import com.ssafy.c107.main.domain.subscribe.dto.response.GetSubscribeResponse;

public interface SubscribeService {
    GetSubscribeResponse getSubscribe(Long id);
}
