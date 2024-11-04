package com.ssafy.c107.main.domain.members.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewDetail {

    private String img;
    private String memberEmail;
    private String foodName;
    private String comment;
}
