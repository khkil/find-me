package com.example.backend.test.user;

import com.example.backend.test.result.UserResult;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {

    List<User> getUsers(int inspection_idx);
    User loadUserByUserName(String user_id);
    void insertUserInfo(UserResult userResult);
    void insertUserAnswers(int user_idx, int question_idx, int answer_idx);
}
