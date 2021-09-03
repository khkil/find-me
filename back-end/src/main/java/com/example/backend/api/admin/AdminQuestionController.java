package com.example.backend.api.admin;

import com.example.backend.api.question.Question;
import com.example.backend.api.question.QuestionService;
import com.example.backend.common.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/questions")
public class AdminQuestionController {

    @Autowired
    QuestionService questionService;

    @PutMapping
    public ResponseEntity updateQuestions(@RequestBody List<Question> questions){
        return ResponseEntity.ok(questions);
    }

    @DeleteMapping("/{questionIdx}")
    public ResponseEntity deleteQuestion(@PathVariable int questionIdx){
        questionService.deleteQuestion(questionIdx);
        return ResponseEntity.ok(CommonResponse.successResult());
    }

    @PutMapping("/{questionIdx}")
    public ResponseEntity updateQuestion(@PathVariable int questionIdx, @RequestBody Question question){
        questionService.updateQuestion(questionIdx, question);
        return ResponseEntity.ok(CommonResponse.successResult());
    }
}
