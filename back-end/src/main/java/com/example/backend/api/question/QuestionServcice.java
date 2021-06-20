package com.example.backend.api.question;

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
    public List<?> getQuestionInfo(int inspectionIdx){
        return questionMapper.getQuestionList(inspectionIdx);
    }
    public List<String> getPageInfo(int inspection_idx, int page){
        return questionMapper.getPageInfo(inspection_idx, page);
    }
}
