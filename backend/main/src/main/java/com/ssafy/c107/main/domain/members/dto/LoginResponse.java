package com.ssafy.c107.main.domain.members.dto;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class LoginResponse {

    private String name;
    private String email;
    private String phoneNumber;
    private String birth;
    private String address;
    private String role;
    private String uuid;
}
