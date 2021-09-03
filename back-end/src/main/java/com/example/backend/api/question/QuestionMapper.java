package com.example.backend.api.question;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionMapper {

    List<Question> getQuestionList(int idx);
    //List<?> getQuestionInfo(int inspectionIdx);
    List<String> getPageInfo(@Param("inspection_idx") int inspection_idx, @Param("page") int page);

    void deleteQuestion(int questionIdx);
    void updateQuestion(@Param("questionIdx") int questionIdx, @Param("question") Question question);

}
