package com.example.backend.auth;

import com.example.backend.auth.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    MemberMapper memberMapper;

    public Member loadUserByUserName(String member_id){
        return memberMapper.loadUserByUserName(member_id);
    }
}
