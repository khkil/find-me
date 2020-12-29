package com.example.backend.service;

import com.example.backend.mapper.InspectionMapper;
import com.example.backend.mapper.QuestionMapper;
import com.example.backend.model.Inspection;
import com.example.backend.model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class QuestionServcice {

    @Autowired
    QuestionMapper questionMapper;

    public List<Question> getQuestionList(int idx){
        return questionMapper.getQuestionList(idx);
    }
    public List<String> getQuestionListToPages(int inspection_idx, int page){
        return questionMapper.getQuestionListToPages(inspection_idx, page);
    }
}
