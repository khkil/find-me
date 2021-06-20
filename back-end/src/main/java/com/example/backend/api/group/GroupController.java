package com.example.backend.api.group;

import com.example.backend.api.inspection.Inspection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    GroupServcice groupServcice;

    @GetMapping
    public ResponseEntity<List> getGroupList() {
        return new ResponseEntity<>(groupServcice.getGroupList(), HttpStatus.OK);
    }
}
