package com.ssafy.c107.main.domain.subscribe.service;


public interface MemberSubscribeService {
    void cancelSubscription(Long memberId, Long subscribeId);
}
