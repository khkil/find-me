package com.example.backend.test.result;

import com.example.backend.common.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    @Autowired
    ResultServcice resultServcice;

    @PostMapping
    public ResponseEntity<?> getResults(@RequestBody Map<String, Object> map) {

        List<Result> resultList = resultServcice.getResults(map);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
}