package com.example.backend.api.answer;

import lombok.Data;

@Data
public class Answer {

    private int answerIdx;
    private int questionIdx;
    private int answerText;
    private int answerScore;

}
