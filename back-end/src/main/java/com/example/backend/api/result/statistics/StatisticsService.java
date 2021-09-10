package com.example.backend.api.result.statistics;

import com.example.backend.api.question.Question;
import com.example.backend.api.result.Result;
import com.example.backend.util.GroundUtil;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

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
            result.put("name", statistics.getResultName());
            result.put("score", statistics.getResultScore());

            if(!statisticsResult.has(key)){
                JSONObject obj = new JSONObject();
                JSONArray results = new JSONArray();
                List<Integer> grades = new ArrayList<>();
                results.put(result);
                grades.add(statistics.getResultScore());

                obj.put("userName", statistics.getUserName());
                obj.put("results", results);
                obj.put("grades", grades);
                statisticsResult.put(key, obj);


            }else{
                JSONObject obj = statisticsResult.getJSONObject(key);
                obj.getJSONArray("results").put(result);
                obj.getJSONArray("grades").put(statistics.getResultScore());

            }

        }

        Iterator<String> iter = statisticsResult.keys();
        while(iter.hasNext()){
            String key = iter.next();
            JSONObject value = statisticsResult.getJSONObject(key);
            JSONArray grades = value.getJSONArray("grades");
            List<Integer> grades1 = new Gson().fromJson(grades.toString(), List.class);

            grades1.sort(Comparator.naturalOrder());
            System.out.println(grades1);
        }
        return statisticsResult;
    }
}
