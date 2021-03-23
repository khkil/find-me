package com.example.backend.api.user;

import lombok.Data;

import java.sql.Date;

@Data
public class User {

    private int user_idx;
    private int inspection_idx;
    private String user_name;
    private String user_age;
    private String user_gender;
    private Date cdate;

}
