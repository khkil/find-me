package com.example.backend.auth;

import com.example.backend.auth.model.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MemberService implements UserDetailsService {

    @Autowired
    MemberMapper memberMapper;

    @Override
    public Member loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberMapper.loadUserByUserName(username);
    }
}
