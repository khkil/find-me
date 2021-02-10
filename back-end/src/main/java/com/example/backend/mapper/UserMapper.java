package com.example.backend.mapper;

import com.example.backend.model.Inspection;
import com.example.backend.model.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserMapper {

    int getUserCount(int inspection_idx);
    User getUserInfo(Map<String, Object> user);
}
