package com.example.backend.model;

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
    private String user_id;
    private String user_pwd;
    private Date cdate;

}
