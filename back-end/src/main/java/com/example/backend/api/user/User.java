package com.example.backend.api.user;

import lombok.Data;

import java.sql.Date;

@Data
public class User {

    private int userIdx;
    private int inspectionIdx;
    private String userName;
    private String userAge;
    private String userGender;
    private String groupIdx;
    private Date cdate;

}
