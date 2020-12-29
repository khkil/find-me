package com.example.backend.controller;

import com.example.backend.model.Inspection;
import com.example.backend.service.InspectionServcice;
import com.example.backend.service.QuestionServcice;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/inspections")
public class InspectionController {

    @Autowired
    InspectionServcice inspectionServcice;

    @Autowired
    QuestionServcice questionServcice;

    @GetMapping
    public ResponseEntity<List> getInspectionList() throws  Exception{

        return new ResponseEntity<>(inspectionServcice.getInspectionList(), HttpStatus.OK);
    }

    @GetMapping("/{idx}")
    public ResponseEntity<Inspection> getInspectionDetail(@PathVariable int idx){

        Inspection inspectionDetail = inspectionServcice.getInspectionDetail(idx);
        if(inspectionDetail == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Inspection>(inspectionServcice.getInspectionDetail(idx), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateInspection(@RequestBody Inspection inspection){
        return null;
    }

    @GetMapping("/{idx}/questions")
    public ResponseEntity<List> getQuestionList (@PathVariable int idx){
        return new ResponseEntity<>(questionServcice.getQuestionList(idx), HttpStatus.OK);
    }

    @GetMapping("/{inspection_idx}/pages/{page}")
    public ResponseEntity<List> getInspectionPage(@PathVariable int inspection_idx, @PathVariable int page){

        return new ResponseEntity<>(questionServcice.getQuestionListToPages(inspection_idx, page), HttpStatus.OK);
    }
}
