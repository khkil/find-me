package com.example.backend.test.inspection;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InspectionMapper {

    List<Inspection> getInspectionList();
    Inspection getInspectionDetail(int idx);

}
