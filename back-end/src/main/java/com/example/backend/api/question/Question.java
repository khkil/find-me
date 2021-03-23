package com.example.backend.api.question;

import com.example.backend.api.answer.Answer;
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
