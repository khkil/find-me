package com.example.backend.api.admin;

import com.example.backend.api.question.Question;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/questions")
public class AdminQuestionController {

    @PutMapping
    public ResponseEntity updateQuestions(@RequestBody List<Question> questions){
        return ResponseEntity.ok(questions);
    }
}
