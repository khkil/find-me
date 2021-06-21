package com.example.backend.api.group;

import com.example.backend.api.inspection.Inspection;
import com.example.backend.common.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    GroupServcice groupServcice;

    @GetMapping
    public ResponseEntity<List> getGroupList() {
        return new ResponseEntity<>(groupServcice.getGroupList(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity insertGroup(@RequestBody Group group){

        groupServcice.insertGroup(group);
        Map<String, Object> groupMap = CommonResponse.getDataMap("group", group);
        return ResponseEntity.ok(CommonResponse.successResult(groupMap));
    }
}
