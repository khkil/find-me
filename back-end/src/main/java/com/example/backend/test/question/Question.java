package com.example.backend.test.question;

import com.example.backend.test.answer.Answer;
import lombok.Data;

import java.util.List;

@Data
public class Question {

    private int question_idx;
    private int inspection_idx;
    private int result_idx;
    private int question_page;
    private int question_number;
    private String question_text;

    private List<Answer> answers;

}
