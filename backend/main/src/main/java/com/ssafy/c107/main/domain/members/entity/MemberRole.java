package com.ssafy.c107.main.domain.members.entity;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum MemberRole {
    BUYER("Buyer"), SELLER("Seller"),
    ;

    private final String role;

    MemberRole(String role) {
        this.role = role;
    }
}
