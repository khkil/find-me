package com.example.backend.api.admin.ground;

import com.example.backend.api.result.statistics.Statistics;
import com.example.backend.api.result.statistics.StatisticsService;
import com.example.backend.util.GroundUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/ground")
public class AdminGroundController {

    @Autowired
    StatisticsService statisticsService;

    @PostMapping("/excel/statistics")
    public ResponseEntity downStatisticsExcel(@RequestParam(required = true) int inspectionIdx ){
        return ResponseEntity.ok(statisticsService.getGroundStatistics(inspectionIdx).toMap());
    }
}
