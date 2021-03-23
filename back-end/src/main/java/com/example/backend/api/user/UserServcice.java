package com.example.backend.api.user;

import com.example.backend.api.result.UserResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServcice {

    @Autowired
    UserMapper userMapper;

    public List<User> getUsers(int inspection_idx){
       return userMapper.getUsers(inspection_idx);
    }

    public void insertUserAnswers(int user_idx, int question_idx, int answer_idx){
        userMapper.insertUserAnswers(user_idx, question_idx, answer_idx);
    }

    public void inserUserInfo(UserResult userResult){
        userMapper.insertUserInfo(userResult);
    }
}
