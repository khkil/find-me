package com.example.backend.auth;

import com.example.backend.auth.model.Member;
import com.example.backend.common.CommonResponse;
import com.example.backend.test.user.User;
import com.example.backend.test.user.UserServcice;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
        Member user = memberService.loadUserByUserName(params.getMember_id());
        if(user == null) {
            return new ResponseEntity<>(CommonResponse.failResult("존재하지 않는 유저입니다."), HttpStatus.OK);
        }
        List<String> roles = new ArrayList<>();
        String token =  jwtTokenProvider.createToken(user.getMember_id(), roles);
        String userPk = jwtTokenProvider.getUserPk(token);

        Member member = memberService.loadUserByUserName(userPk);
        if(!params.getMember_pwd().equals(member.getMember_pwd())){
            return ResponseEntity.ok(CommonResponse.failResult("비밀번호가 틀렸습니다."));
        }
        Jws<Claims> claims = jwtTokenProvider.getClaims(token);
        ret.put("body", claims.getBody());
        ret.put("token", token);
        return ResponseEntity.ok(ret);
    }

    @PostMapping("/info")
    public ResponseEntity getUserInfo(@RequestBody Map<String, String> params){
        String token = params.get("token");
        System.out.println(token);
        boolean isVaidateToken = jwtTokenProvider.validateToken(token);
        if(!isVaidateToken){
            return ResponseEntity.ok(CommonResponse.failResult("유효하지 않은 토큰입니다."));
        }

        String userPk = jwtTokenProvider.getUserPk(params.get("token"));
        Member member = memberService.loadUserByUserName(userPk);

        return ResponseEntity.ok(member);

    }


}