package com.ssafy.c107.main.domain.members.entity;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum MemberRole {
    BUYER("BUYER"), SELLER("SELLER"),
    ;

    private final String role;

    MemberRole(String role) {
        this.role = role;
    }

    public String getRole(){
        return this.role;
    }
}
