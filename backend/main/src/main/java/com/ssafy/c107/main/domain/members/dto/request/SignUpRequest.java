package com.ssafy.c107.main.domain.members.dto.request;

import lombok.Data;

@Data
public class SignUpRequest {

    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String birth;
    private String address;
    private String role;
}
