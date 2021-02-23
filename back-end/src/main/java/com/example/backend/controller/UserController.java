package com.example.backend.controller;

import com.example.backend.config.secutiry.JwtTokenProvider;
import com.example.backend.model.common.CommonResponse;
import com.example.backend.model.User;
import com.example.backend.service.UserServcice;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserServcice userServcice;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @GetMapping("/count/{inspection_idx}")
    public int getUserCount(@PathVariable int inspection_idx){
        return userServcice.getUserCount(inspection_idx);
    }

    @GetMapping("/{user_idx}}")
    public ResponseEntity getUserInfo(@PathVariable String user_idx){
        User user = userServcice.loadUserByUserName(user_idx);
        if(user == null)
            return new ResponseEntity<>(CommonResponse.failResult("user is null"), HttpStatus.OK);

        return ResponseEntity.ok(user);
    }

}
