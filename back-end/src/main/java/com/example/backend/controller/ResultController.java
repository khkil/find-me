package com.example.backend.controller;

import com.example.backend.model.common.CommonResponse;
import com.example.backend.model.Result;
import com.example.backend.model.UserResult;
import com.example.backend.service.ResultServcice;
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

    @PostMapping("/user/select")
    public ResponseEntity<?> getUserResult(@RequestBody Map<String, Object> map) {

        List<Result> resultList = resultServcice.getUserResult(map);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    @PostMapping("/user/insert")
    public ResponseEntity<CommonResponse> insertUserResult(@RequestBody UserResult userResult) {

        List<Map<String, Integer>> userAnswers = userResult.getUser_answers();
        if (userAnswers.size() == 0) {
            return new ResponseEntity<>(CommonResponse.failResult("answer is empty"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        resultServcice.insertUserInfoResult(userResult);
        if (userResult.getUser_idx() == 0) {
            return new ResponseEntity<>(CommonResponse.failResult("user_idx is empty"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        int userIdx = userResult.getUser_idx();
        for (Map<String, Integer> answer : userAnswers) {
            int questionIdx = answer.get("question_idx");
            int answerIdx = answer.get("answer_idx");
            resultServcice.insertUserAnswerResult(userIdx, questionIdx, answerIdx);
        }
        return new ResponseEntity<>(CommonResponse.successResult(), HttpStatus.OK);
    }
}
