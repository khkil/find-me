package com.example.backend.api.inspection;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InspectionMapper {

    List<Inspection> getInspectionList();
    Inspection getInspectionDetail(int idx);

}
