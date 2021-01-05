package com.example.backend.mapper;

import com.example.backend.model.Inspection;
import com.example.backend.model.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {

    void insertUser(User user);

}
