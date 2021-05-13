package com.example.backend.api.auth;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface MemberMapper {
    Member loadUserByUserName(String id);
    Member findIdByInfo(String id, String email);
    Member findIdByPhone(String phone);
    void insertMember(Member member);
    void updateMember(String idx, Member member);

}
