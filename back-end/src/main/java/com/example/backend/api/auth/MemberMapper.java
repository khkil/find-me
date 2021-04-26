package com.example.backend.api.auth;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface MemberMapper {
    Member loadUserByUserName(String id);
    Member findIdByInfo(String id, String email);
    Member findIdByPhone(String phone);
    void insertMember(Member member);

}
