package com.example.backend.api.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MemberService implements UserDetailsService {

    @Autowired
    MemberMapper memberMapper;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Member member = memberMapper.loadUserByUserName(id);

        if(member != null){
            List<GrantedAuthority> roles = Arrays.asList(new SimpleGrantedAuthority(member.getRole()));
            member.setAuthorities(roles);
        }
        return member;
    }

    public Member findIdByInfo(String id, String email){
        return memberMapper.findIdByInfo(id, email);
    }

    public Member findIdByPhone(String phone){
        return memberMapper.findIdByPhone(phone);
    }

    public void insertMember(Member member){
        memberMapper.insertMember(member);
    }

    public void updateMember(String idx, Member member){
        memberMapper.updateMember(idx, member);
    }
    public void validateDulplicateMember(Member member){
        Member findMember = memberMapper.loadUserByUserName(member.getId());
        if(findMember != null){
            throw new IllegalArgumentException("이미 존재하는 회원 입니다");
        }
    }
}
