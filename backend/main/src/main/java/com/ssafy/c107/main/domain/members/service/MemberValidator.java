package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.exception.InvalidMemberRoleException;
import com.ssafy.c107.main.domain.store.entity.Store;
import com.ssafy.c107.main.domain.store.repository.StoreRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MemberValidator {

    private final StoreRepository storeRepository;

    void validStoreAndMember(Long storeId, Long memberId) {
        Optional<Store> os = storeRepository.findByMember_IdAndId(memberId, storeId);
        if (os.isEmpty()) {
            throw new InvalidMemberRoleException();
        }
    }
}
