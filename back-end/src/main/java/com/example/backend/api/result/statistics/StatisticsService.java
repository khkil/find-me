package com.example.backend.api.result.statistics;

import com.example.backend.api.question.Question;
import com.example.backend.api.result.Result;
import com.example.backend.util.GroundUtil;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Transactional
@Service
public class StatisticsService {

    @Autowired StatisticsMapper statisticsMapper;

    public JSONObject getGroundStatistics(int inspectionIdx){
        JSONObject statisticsResult = new JSONObject();

        for(Statistics statistics: statisticsMapper.getGroundStatistics(inspectionIdx)){
            /*int groupIdx = statistics.getGroupIdx();
            boolean hasGroup = groupIdx > 0;
            if(!hasGroup) continue;*/

            String key = "user_" + statistics.getUserIdx();
            String resultName = GroundUtil.resultMap.get(statistics.getResultIdx());
            statistics.setResultName(resultName);
            JSONObject result = new JSONObject();
            result.put("resultName", statistics.getResultName());
            result.put("resultScore", statistics.getResultScore());

            if(!statisticsResult.has(key)){
                JSONObject obj = new JSONObject();
                JSONArray results = new JSONArray();
                results.put(result);
                obj.put("userName", statistics.getUserName());
                obj.put("results", results);
                statisticsResult.put(key, obj);
            }else{
                JSONObject obj = statisticsResult.getJSONObject(key);
                obj.getJSONArray("results").put(result);

            }

        }
        return statisticsResult;
    }
}
