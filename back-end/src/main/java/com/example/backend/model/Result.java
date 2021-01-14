package com.example.backend.model;

import lombok.Data;

@Data
public class Result {

    private int result_idx;
    private String result_name;
    private String result_title;
    private String main_sentence;
    private String sub_sentence;
    private String keyword1;
    private String keyword2;
    private int inspection_idx;
    private int question_page;

}
