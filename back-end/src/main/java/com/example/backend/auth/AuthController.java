package com.example.backend.auth;

import com.example.backend.auth.model.Member;
import com.example.backend.auth.model.Role;
import com.example.backend.common.CommonResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    MemberService memberService;
    @Autowired
    JwtTokenProvider jwtTokenProvider;



    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Member params){
        Map<String, Object> ret = new HashMap<>();
        Member user = (Member) memberService.loadUserByUsername(params.getUsername());
        List<String> roles = Arrays.asList(user.getRole());

        if(user == null) {
            return ResponseEntity.ok(CommonResponse.failResult("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다"));
        }

        String token =  jwtTokenProvider.createToken(user.getId(), roles);
        String userPk = jwtTokenProvider.getUserPk(token);

        Member member = (Member) memberService.loadUserByUsername(userPk);
        if(!params.getPassword().equals(member.getPassword())){
            return ResponseEntity.ok(CommonResponse.failResult("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다"));
        }

        Jws<Claims> claims = jwtTokenProvider.getClaims(token);
        ret.put("body", claims.getBody());
        ret.put("token", token);
        return ResponseEntity.ok(ret);

    }

    @GetMapping("/info")
    public ResponseEntity getUserInfo(HttpServletRequest request){
        String userPk = (String) request.getAttribute("userPk");
        Member member = (Member) memberService.loadUserByUsername(userPk);
        return ResponseEntity.ok().body(member);
    }
}
