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
        String userName = params.getUsername();
        Member user = (Member) memberService.loadUserByUsername(userName);

        if(user == null) {
            return ResponseEntity.badRequest().body(CommonResponse.failResult(LOGIN_ERROR_MESSAGE));
        }
        List<String> roles = Arrays.asList(user.getRole());

        if(!roles.contains(params.getRole())){
            return ResponseEntity.badRequest().body(CommonResponse.failResult("권한 에러"));
        }

        String token =  jwtTokenProvider.createToken(user.getId(), roles);
        String userPk = jwtTokenProvider.getUserPk(token);

        Member member = (Member) memberService.loadUserByUsername(userPk);
        if(!user.getPassword().equals(member.getPassword())){
            return ResponseEntity.badRequest().body(CommonResponse.failResult(LOGIN_ERROR_MESSAGE));
        }

        return ResponseEntity.ok(new Auth(token));

    }

    @PostMapping("/sign-up")
    public ResponseEntity signUp(@RequestBody Member member){

        memberService.insertMember(member);
        List<String> roles = Arrays.asList(member.getRole());
        String token =  jwtTokenProvider.createToken(member.getId(), roles);
        Jws<Claims> claims = jwtTokenProvider.getClaims(token);

        return ResponseEntity.ok(new Auth(token));
    }

    @PostMapping("/check-id")
    public ResponseEntity validateDuplicateMember(@RequestBody Member member){
        memberService.validateDulplicateMember(member);
        return ResponseEntity.ok(CommonResponse.successResult());
    }

    @GetMapping("/info")
    public ResponseEntity getUserInfo(HttpServletRequest request){
        String userPk = (String) request.getAttribute("userPk");
        Member member = (Member) memberService.loadUserByUsername(userPk);
        return ResponseEntity.ok().body(member);
    }
}
