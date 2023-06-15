package com.company.project.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.http.HttpMethod.*;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfiguration {

    private final FilterChainExceptionHandler filterChainExceptionHandler;
    private final GoogleAuthService googleAuthService;

    public WebSecurityConfiguration(GoogleAuthService googleAuthService,
                                    FilterChainExceptionHandler filterChainExceptionHandler) {
        this.googleAuthService = googleAuthService;
        this.filterChainExceptionHandler = filterChainExceptionHandler;
    }

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        GoogleTokenFilter googleTokenFilter = new GoogleTokenFilter(googleAuthService);
//        http.cors().and()
//                .csrf().disable();
//
//        http.authorizeRequests()
//                .anyRequest().permitAll();
//
//        http.addFilterBefore(googleTokenFilter, UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(filterChainExceptionHandler, GoogleTokenFilter.class)
//                .sessionManagement().sessionCreationPolicy(STATELESS);
//
//        http.headers().frameOptions().disable();
        return http.build();

    }

}