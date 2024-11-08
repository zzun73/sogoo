package com.ssafy.c107.main.domain.members.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "token", timeToLive = 86400)
@AllArgsConstructor
@Getter
public class Token {

    @Id
    private Long id;
    private String refreshToken;
}
