package com.example.backend.auth.model;

import lombok.Data;

import java.sql.Date;

@Data
public class Member {

    private int member_idx;
    private String member_id;
    private String member_pwd;
    private String member_name;
    private Role member_role;
    private String cdate;
}
