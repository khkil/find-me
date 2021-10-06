package com.example.backend.api.admin.ground;

import com.example.backend.api.result.statistics.StatisticsService;
import com.example.backend.api.user.User;
import com.example.backend.api.user.UserAnswer;
import com.example.backend.api.user.UserServcice;
import com.example.backend.util.ExcelGenerator;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/ground")
public class AdminGroundController {

    @Autowired
    StatisticsService statisticsService;

    @Autowired
    UserServcice userServcice;

    @GetMapping("/excel/statistics")
    public ResponseEntity downStatisticsExcel(@RequestParam(required = true) int inspectionIdx) throws IOException {

        JSONObject data = statisticsService.getGroundStatistics(inspectionIdx);
        ByteArrayInputStream in = ExcelGenerator.groundStatisticsExcel(data);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=statistics.xlsx");

        return ResponseEntity.ok().headers(headers).body(new InputStreamResource(in));

    }

    @GetMapping("/excel/statistics/users/{userIdx}")
    public ResponseEntity downPrivateStatisticsExcel(@PathVariable int userIdx) throws IOException {

        User user = userServcice.getUserDetail(userIdx);
        List<Map<String, Object>> answers = userServcice.getUserAnswers(userIdx);
        ByteArrayInputStream in = ExcelGenerator.groundPersonalStatisticsExcel(user);
        HttpHeaders headers = new HttpHeaders();
        String fileName = URLEncoder.encode(user.getUserName() + "_문항", "UTF-8").replaceAll("\\+", "%20");
        headers.add("Content-Type", "application/octet-stream");
        headers.add("Content-Disposition", "attachment; filename="+ fileName +"xlsx");

        return ResponseEntity.ok().headers(headers).body(new InputStreamResource(in));

    }
}
