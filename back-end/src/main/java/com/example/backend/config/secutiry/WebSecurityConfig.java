package com.example.backend.config.secutiry;

import com.example.backend.auth.model.Role;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .httpBasic().disable()
            .csrf().disable()
            .authorizeRequests()
            //.antMatchers("/api/admin/**").hasRole("ADMIN")
            //.antMatchers("/api/member/**").hasRole("MEMBER")
            .antMatchers("/**").permitAll();
    }
}