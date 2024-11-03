package com.ssafy.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable);

        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/actuator/health").permitAll()  // health 엔드포인트는 인증 없이 접근 가능
                        .requestMatchers("/actuator/**").hasRole("ADMIN")
                        .anyRequest().authenticated()                     // 그 외의 모든 요청은 인증 필요
                )
                .httpBasic(Customizer.withDefaults()); // 기본 인증(Basic Auth) 설정

        return http.build();
    }
}
