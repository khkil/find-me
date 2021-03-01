package com.example.backend.test.result;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class ResultServcice {

    @Autowired
    ResultMapper resultMapper;

    public List<Result> getResults(Map<String, Object> params){
        return resultMapper.getResults(params);
    }

}
