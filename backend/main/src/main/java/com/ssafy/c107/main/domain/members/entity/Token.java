package com.ssafy.c107.main.domain.members.entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@RedisHash(value = "token", timeToLive = 86400)
@AllArgsConstructor
@Getter
@ToString
public class Token {

    @Id
    private Long id;
    @Indexed
    private String refreshToken;
}
