package com.example.backend.controller;

import com.example.backend.config.secutiry.JwtTokenProvider;
import com.example.backend.model.common.CommonResponse;
import com.example.backend.model.User;
import com.example.backend.service.UserServcice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserServcice userServcice;
    @Autowired
    JwtTokenProvider jwtTokenProvider;



    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> map){
        User user = userServcice.loadUserByUserName(map.get("user_id"));
        if(user == null) return new ResponseEntity<>(CommonResponse.failResult("user is null"), HttpStatus.OK);

        List<String> roles = new ArrayList<>();
        String token =  jwtTokenProvider.createToken(user.getUser_id(), roles);
        String userPk = jwtTokenProvider.getUserPk(token);

        User member = userServcice.loadUserByUserName(userPk);
        if(!map.get("user_pwd").equals(member.getUser_pwd())) return new ResponseEntity<>(CommonResponse.failResult("user_pwd is incorrectly"), HttpStatus.OK);


        return ResponseEntity.ok(jwtTokenProvider.getClaims(token));
    }


}
