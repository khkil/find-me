package com.example.backend.service;

import com.example.backend.mapper.QuestionMapper;
import com.example.backend.mapper.ResultMapper;
import com.example.backend.model.Question;
import com.example.backend.model.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ResultServcice {

    @Autowired
    ResultMapper resultMapper;

    public List<Result> getResultList(int inspection_idx){
        return resultMapper.getResultList(inspection_idx);
    }

}
