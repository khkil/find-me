package com.example.backend.test.user;

import lombok.Data;

import javax.validation.constraints.NotNull;
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
