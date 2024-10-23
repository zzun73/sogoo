package com.ssafy.c107.main.domain.members.service;

import com.ssafy.c107.main.domain.members.dto.CustomUserDetails;
import com.ssafy.c107.main.domain.members.entity.Member;
import com.ssafy.c107.main.domain.members.entity.WithDrawalStatus;
import com.ssafy.c107.main.domain.members.exception.MemberNotFoundException;
import com.ssafy.c107.main.domain.members.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomMemberDetailsService implements UserDetailsService {
    private final MemberRepository membersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Member userData = membersRepository.findByEmailAndWithDrawalStatus(username, WithDrawalStatus.ACTIVE).orElseThrow(
            MemberNotFoundException::new);

        if (username != null) {
            //UserDetails에 담아서 return 하면 AuthenticationManager가 검증
            return new CustomUserDetails(userData);
        }
        return null;
    }
}
