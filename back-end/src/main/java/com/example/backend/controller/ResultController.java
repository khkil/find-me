package com.example.backend.controller;

import com.example.backend.model.Result;
import com.example.backend.service.ResultServcice;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/result")
public class ResultController {

    @Autowired
    ResultServcice resultServcice;
    @PostMapping("/user")
    public ResponseEntity<?> getInspectionDetail(@RequestBody Map<String, Object> map){

        List<Result> resultList = resultServcice.getUserResult(map);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
}
