package com.example.backend.test.answer;

import lombok.Data;

@Data
public class Answer {

    private int answer_idx;
    private int question_idx;
    private int answer_text;
    private int answer_score;

}
