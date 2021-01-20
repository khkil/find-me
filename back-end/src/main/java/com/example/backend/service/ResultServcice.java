package com.example.backend.service;

import com.example.backend.mapper.QuestionMapper;
import com.example.backend.mapper.ResultMapper;
import com.example.backend.model.Question;
import com.example.backend.model.Result;
import com.example.backend.model.UserResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ResultServcice {

    @Autowired
    ResultMapper resultMapper;

    public List<Result> getUserResult(Map<String, Object> params){
        return resultMapper.getUserResult(params);
    }

    public void insertUserInfoResult(UserResult userResult){
        resultMapper.insertUserInfoResult(userResult);
    }
    public void insertUserAnswerResult(int user_idx, int question_idx, int answer_idx){
        resultMapper.insertUserAnswerResult(user_idx, question_idx, answer_idx);
    }

}
