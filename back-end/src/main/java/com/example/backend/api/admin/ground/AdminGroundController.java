package com.example.backend.api.admin.ground;

import com.example.backend.api.result.statistics.Statistics;
import com.example.backend.api.result.statistics.StatisticsService;
import com.example.backend.util.ExcelGenerator;
import com.example.backend.util.GroundUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/admin/ground")
public class AdminGroundController {

    @Autowired
    StatisticsService statisticsService;

    @GetMapping("/excel/statistics")
    public ResponseEntity downStatisticsExcel(@RequestParam(required = true) int inspectionIdx) throws IOException {

        JSONObject data = statisticsService.getGroundStatistics(inspectionIdx);
        ByteArrayInputStream in = ExcelGenerator.customersToExcel(data);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=statistics.xlsx");

        return ResponseEntity.ok().headers(headers).body(new InputStreamResource(in));

    }
}
