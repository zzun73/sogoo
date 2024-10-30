package com.ssafy.c107.main.domain.members.entity;

import com.ssafy.c107.main.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "Members")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String password;

    @Column(columnDefinition = "TEXT")
    private String refreshToken;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String birth;

    @Column(nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WithDrawalStatus withDrawalStatus;

    private String role;

    @Builder
    public Member(String name, String email, String password, String refreshToken,
        String phoneNumber, String birth, String address, WithDrawalStatus withDrawalStatus,
        String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.refreshToken = refreshToken;
        this.phoneNumber = phoneNumber;
        this.birth = birth;
        this.address = address;
        this.withDrawalStatus = withDrawalStatus;
        this.role = role;
    }

    public void updateId(Long id) {
        this.id = id;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void deleteRefreshToken() {
        this.refreshToken = null;
    }

    public void updatePassword(String password) {
        this.password = password;
    }

    public void updateAddress(String address) {
        this.address = address;
    }

    public void updateRole(String role) {
        this.role = role;
    }
}
