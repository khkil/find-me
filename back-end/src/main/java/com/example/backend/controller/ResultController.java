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

        JSONObject obj = new JSONObject(map);
        int inspectionIdx = obj.getInt("inspection_idx");
        JSONArray results = obj.getJSONArray("results");

        List<Result> resultList = resultServcice.getResultList(inspectionIdx);
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }
}
