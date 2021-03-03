package com.example.backend.test.user;

import com.example.backend.test.result.UserResult;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface UserMapper {

    List<User> getUsers(int inspection_idx);
    void insertUserInfo(UserResult userResult);
    void insertUserAnswers(int user_idx, int question_idx, int answer_idx);
}
