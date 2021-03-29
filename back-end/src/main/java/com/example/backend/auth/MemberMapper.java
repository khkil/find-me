package com.example.backend.auth;

import com.example.backend.auth.model.Member;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface MemberMapper {
    Member loadUserByUserName(String id);
}
