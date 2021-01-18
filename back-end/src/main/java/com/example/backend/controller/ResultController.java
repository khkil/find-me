package com.example.backend.controller;

import com.example.backend.model.CommonResponse;
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
import java.util.Iterator;
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
    public ResponseEntity<CommonResponse> insertUserResult(@RequestBody Map<String, Object> param){

        JSONObject params = new JSONObject(param);
        JSONObject userInfo = params.getJSONObject("userInfo");
        JSONObject userAnswer = params.getJSONObject("answerState");

        User user = new User();
        user.setUser_age(userInfo.getString("user_age"));
        user.setUser_gender(userInfo.getString("user_gender"));
        userServcice.insertUser(user);
        int user_idx = user.getUser_idx();

        Iterator<String> keys = userAnswer.keys();
        while(keys.hasNext()){
            String key = keys.next();
            JSONArray answers = userAnswer.getJSONArray(key);
            for(Object obj : answers){
                if(obj instanceof  JSONObject){
                    JSONObject answer = (JSONObject)obj;
                    int question_idx = answer.getInt("question_idx");
                    int answer_idx = answer.getInt("answer_idx");
                    resultServcice.insertUserResult(user_idx, question_idx, answer_idx );
                    
                }
            }
        }
        
        return new ResponseEntity<>(CommonResponse.successResult(), HttpStatus.OK);
    }
}
