package com.example.backend.api.user;

import com.example.backend.config.secutiry.JwtTokenProvider;
import com.example.backend.common.CommonResponse;
import com.example.backend.api.result.UserResult;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserServcice userServcice;

    @Autowired
    JwtTokenProvider jwtTokenProvider;


    @GetMapping("/inspections/{inspection_idx}")
    public ResponseEntity getUsers(@PathVariable int inspection_idx){
        List<User> users = userServcice.getUsers(inspection_idx);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userIdx}")
    public ResponseEntity getUserDetail(@PathVariable int userIdx){
        UserDetail user = userServcice.getUserDetail(userIdx);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{userIdx}/answers")
    public ResponseEntity getUserAnswers(@PathVariable int userIdx){
        List<Map<String, Object>> userAnswers = userServcice.getUserAnswers(userIdx);
        return ResponseEntity.ok(userAnswers);
    }


    @PostMapping("/answers")
    public ResponseEntity<CommonResponse> insertUserAnswers(@RequestBody UserResult userResult) {

        userServcice.inserUserInfo(userResult);
        List<Map<String, Integer>> userAnswers = userResult.getUser_answers();
        int userIdx = userResult.getUser_idx();
        for (Map<String, Integer> answer : userAnswers) {
            int questionIdx = answer.get("question_idx");
            int answerIdx = answer.get("answer_idx");
            userServcice.insertUserAnswers(userIdx, questionIdx, answerIdx);
        }
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("user_idx", userIdx);
        return new ResponseEntity<>(CommonResponse.successResult(userInfo), HttpStatus.OK);
    }
}
