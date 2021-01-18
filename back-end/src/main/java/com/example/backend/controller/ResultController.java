package com.example.backend.controller;

import com.example.backend.model.Result;
import com.example.backend.model.User;
import com.example.backend.service.ResultServcice;
import com.example.backend.service.UserServcice;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/result")
public class ResultController {

    @Autowired
    ResultServcice resultServcice;
    @Autowired
    UserServcice userServcice;

    @PostMapping("/user/select")
    public ResponseEntity<?> getUserResult(@RequestBody Map<String, Object> map){

        List<Result> resultList = resultServcice.getUserResult(map);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    @PostMapping("/user/insert")
    public ResponseEntity<?> insertUserResult(@RequestBody Map<String, Object> param){

        JSONObject obj = new JSONObject(param);
        JSONObject userInfo = obj.getJSONObject("userInfo");
        JSONObject userAnswer = obj.getJSONObject("answerState");

        User user = new User();
        user.setUser_age(userInfo.getString("user_age"));
        user.setUser_gender(userInfo.getString("user_gender"));
        //userServcice.insertUser(user);
        //int userIdx = user.getUser_idx();

        

        return new ResponseEntity<>(userAnswer.toMap(), HttpStatus.OK);
    }
}
