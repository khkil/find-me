package com.example.backend.mapper;

import com.example.backend.model.Inspection;
import com.example.backend.model.Question;
import org.json.JSONArray;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InspectionMapper {

    List<Inspection> getInspectionList();
    Inspection getInspectionDetail(int idx);

}
