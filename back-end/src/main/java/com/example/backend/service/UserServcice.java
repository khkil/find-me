package com.example.backend.service;

import com.example.backend.mapper.QuestionMapper;
import com.example.backend.mapper.UserMapper;
import com.example.backend.model.Question;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserServcice {

    @Autowired
    UserMapper userMapper;

    public int getUserCount(int inspection_idx){
       return userMapper.getUserCount(inspection_idx);
    }

    public User loadUserByUserName(String user_id){
        return userMapper.loadUserByUserName(user_id);
    }
}
