package com.example.backend.api.user;

import com.example.backend.config.secutiry.JwtTokenProvider;
import com.example.backend.common.CommonResponse;
import com.example.backend.api.result.UserResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/answers/inspection/{inspection_idx}")
    public int getUserAnswers(@PathVariable int inspection_idx){
        return -1;
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
        return new ResponseEntity<>(CommonResponse.successResult(), HttpStatus.OK);
    }
}
