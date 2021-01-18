package com.example.backend.model;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class User {

    private int user_idx;
    private String user_name;
    private String user_age;
    private String user_gender;
}
