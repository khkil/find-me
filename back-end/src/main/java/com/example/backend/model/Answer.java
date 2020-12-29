package com.example.backend.model;

import lombok.Data;

@Data
public class Answer {

    private int answer_idx;
    private int question_idx;
    private int answer_text;
    private int answer_value;

}
