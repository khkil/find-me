package com.example.backend.service;

import com.example.backend.mapper.InspectionMapper;
import com.example.backend.model.Inspection;
import com.example.backend.model.Question;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InspectionServcice {

    @Autowired
    InspectionMapper inspectionMapper;

    public List<Inspection> getInspectionList(){
        return inspectionMapper.getInspectionList();
    }

    public Inspection getInspectionDetail(int idx){
        return inspectionMapper.getInspectionDetail(idx);
    }

}
