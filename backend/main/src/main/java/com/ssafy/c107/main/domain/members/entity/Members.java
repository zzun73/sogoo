package com.ssafy.c107.main.domain.members.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Members {

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

    private String role;

    @Builder
    public Members(Long id, String name, String email, String password, String refreshToken,
        String phoneNumber, String birth, String address, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.refreshToken = refreshToken;
        this.phoneNumber = phoneNumber;
        this.birth = birth;
        this.address = address;
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
}
