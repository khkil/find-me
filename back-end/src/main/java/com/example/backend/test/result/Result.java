package com.example.backend.test.result;

import lombok.Data;

@Data
public class Result {

    private int result_idx;
    private String result_name;
    private String result_title;
    private String main_sentence;
    private String sub_sentence;
    private String good_keyword;
    private String bad_keyword;
    private int good_result_idx;
    private int bad_result_idx;
    private int inspection_idx;
    private int question_page;

    private Result good_result;
    private Result bad_result;

}
