package com.example.backend.auth;


import com.example.backend.auth.model.Role;
import io.jsonwebtoken.*;
import io.jsonwebtoken.impl.DefaultClock;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    private long tokenValidMilisecond = 1000L * 60 * 60; // 1시간만 토큰 유효
    private static final String SECRET_KEY = "test";
    public static final String AUTHORIZATION = "Authorization";
    private static Clock clock = DefaultClock.INSTANCE;

    private final UserDetailsService userDetailsService;

    public String createToken(String userPk, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userPk);
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + tokenValidMilisecond);
        claims.put("roles", roles);
        claims.put("expire_date", expireDate);
        return Jwts.builder()
                .setClaims(claims) // 데이터
                .setIssuedAt(now) // 토큰 발행일자
                .setExpiration(expireDate) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                .compact();
    }
    public String getUserPk(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(token).getBody().getSubject();
    }

    public Authentication getAuthentication(String token){
        UserDetails userDetails = userDetailsService.loadUserByUsername(getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader(AUTHORIZATION);
    }

    public Jws<Claims> getClaims(String token){
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token);
        return claims;
    }
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KEY.getBytes()).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
