package com.ssafy.c107.main.domain.subscribe.dto.response;

import com.ssafy.c107.main.domain.subscribe.dto.SubscribeDetailDto;
import lombok.Data;

import java.util.List;

@Data
public class GetSubscribeResponse {
    private List<SubscribeDetailDto> subscribes;
}
