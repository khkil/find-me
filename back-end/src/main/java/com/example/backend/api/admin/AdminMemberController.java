package com.example.backend.api.admin;

import com.example.backend.api.member.Member;
import com.example.backend.api.member.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/members")
public class AdminMemberController {


    @Autowired
    MemberService memberService;

    @GetMapping
    public List<Member> getMemberList(){
        return memberService.getMemberList();
    }

    @GetMapping("/{idx}")
    public Member getMemberDetail(@PathVariable String idx){
        return memberService.getMemberDetail(idx);
    }

}
