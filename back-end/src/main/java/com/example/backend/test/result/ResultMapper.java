package com.example.backend.test.result;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ResultMapper {

    List<Result> getResults(Map<String, Object> params);

}
