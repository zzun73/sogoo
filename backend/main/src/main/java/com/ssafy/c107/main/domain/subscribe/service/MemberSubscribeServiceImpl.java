package com.ssafy.c107.main.domain.subscribe.service;

import com.ssafy.c107.main.domain.subscribe.entity.MemberSubscribe;
import com.ssafy.c107.main.domain.subscribe.entity.SubscribeStatus;
import com.ssafy.c107.main.domain.subscribe.exception.AlreadyInSubscribeCancelScheduledStatusException;
import com.ssafy.c107.main.domain.subscribe.exception.CannotCancelAfterEndDateException;
import com.ssafy.c107.main.domain.subscribe.exception.SubscriptionNotFoundForMemberException;
import com.ssafy.c107.main.domain.subscribe.repository.MemberSubscribeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberSubscribeServiceImpl implements MemberSubscribeService {

    private final MemberSubscribeRepository memberSubscribeRepository;

    @Override
    public void cancelSubscription(Long memberId, Long memberSubscribeId) {
        MemberSubscribe memberSubscribe = memberSubscribeRepository.findByIdAndMember_Id(memberSubscribeId, memberId)
                .orElseThrow(SubscriptionNotFoundForMemberException::new);

        if (memberSubscribe.getEndDate().isBefore(LocalDateTime.now())) {
            throw new CannotCancelAfterEndDateException();
        }else if (memberSubscribe.getStatus() == SubscribeStatus.CANCEL_SCHEDULE){
            throw new AlreadyInSubscribeCancelScheduledStatusException();
        }

        memberSubscribe.updateStatusToCancelScheduled();
        memberSubscribeRepository.save(memberSubscribe);
    }
}