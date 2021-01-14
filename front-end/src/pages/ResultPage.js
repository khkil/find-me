import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { Redirect } from 'react-router-dom';
import Loading from '../components/common/Loading';
import getUserResult from '../api/resultAPI';

const ResultPage = () => {

  const inspection = useSelector(state => state.inspection);
  const { state } = useLocation();

  useEffect(() => {
    
    if(!state || !state.userInfo) return <Redirect to= "/"/>;
    const { answerState } = state; 
    let highScore = 0;
    let allAnswers = [];

    for(const key in answerState){
      const result = key.replace('result_', '');
      const answers = answerState[key];
      let totalScore = 0;
      answers.forEach(answer => {
        totalScore += parseInt(answer.score);
      });
  
      if(highScore < totalScore){
        highScore = totalScore;
      }
      allAnswers = allAnswers.concat({ 
        result: result,
        totalScore: totalScore
      });
    }
    
     let params = {};
     const results = allAnswers.filter(allAnswer => allAnswer.totalScore === highScore);
     //const { inspection_idx } = inspection.data;
     const inspection_idx = 1;
     params = {
       inspection_idx: inspection_idx,
       results: results.map(result => result.result)
     }
     getUserResult(params);
  
  }, [])

  return (
    <>
    </>
  )
}

export default ResultPage;