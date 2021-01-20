package com.example.backend.mapper;

import com.example.backend.model.Result;
import com.example.backend.model.UserResult;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ResultMapper {

    List<Result> getUserResult(Map<String, Object> params);
    void insertUserInfoResult(UserResult userResult);
    void insertUserAnswerResult(int user_idx, int question_idx, int answer_idx);

}
