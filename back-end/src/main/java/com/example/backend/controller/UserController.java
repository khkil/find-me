package com.example.backend.controller;

import com.example.backend.model.CommonResponse;
import com.example.backend.model.Inspection;
import com.example.backend.model.User;
import com.example.backend.service.InspectionServcice;
import com.example.backend.service.QuestionServcice;
import com.example.backend.service.UserServcice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserServcice userServcice;

    @GetMapping("/count/{inspection_idx}")
    public int getUserCount(@PathVariable int inspection_idx){
        return userServcice.getUserCount(inspection_idx);
    }

    @GetMapping("/login")
    public ResponseEntity<User> login(@RequestBody Map<String, Object> map){
        User user = userServcice.getUserInfo(map);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
