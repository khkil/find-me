package com.example.backend.mapper;

import com.example.backend.model.Inspection;
import com.example.backend.model.Question;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionMapper {

    List<Question> getQuestionList(int idx);
    List<String> getQuestionListToPages(@Param("inspection_idx") int inspection_idx, @Param("page") int page);

}
