package com.example.backend.api.auth;

import com.example.backend.config.secutiry.JwtTokenProvider;
import com.example.backend.common.CommonResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final String LOGIN_ERROR_MESSAGE = "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다";

    @Autowired
    MemberService memberService;
    @Autowired
    JwtTokenProvider jwtTokenProvider;



    @PostMapping("/login")
    public ResponseEntity login(@RequestBody Member params){
        Map<String, Object> ret = new HashMap<>();
        Member user = (Member) memberService.loadUserByUsername(params.getUsername());

        if(user == null) {
            return ResponseEntity.ok(CommonResponse.failResult(LOGIN_ERROR_MESSAGE));
        }
        List<String> roles = Arrays.asList(user.getRole());
        if(!roles.contains(params.getRole())){
            return ResponseEntity.badRequest().body(CommonResponse.failResult("권한 에러"));
        }

        String token =  jwtTokenProvider.createToken(user.getId(), roles);
        String userPk = jwtTokenProvider.getUserPk(token);

        Member member = (Member) memberService.loadUserByUsername(userPk);
        if(!params.getPassword().equals(member.getPassword())){
            return ResponseEntity.badRequest().body(CommonResponse.failResult(LOGIN_ERROR_MESSAGE));
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
