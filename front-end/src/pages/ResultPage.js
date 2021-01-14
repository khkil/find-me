import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { Redirect } from 'react-router-dom';

const ResultPage = ({ match }) => {
  const inspection = useSelector(state => state.inspection);
  const { state } = useLocation();
  if(!state || !state.userInfo) return <Redirect to= "/"/>;
  const { userInfo, answerState } = state; 
  let highScore = 0;
  let allAnswers = [];

  for(const key in answerState){
    const page = key.replace('page_', '');
    const { answers } = answerState[key];
    let totalScore = 0;
    answers.forEach(answer => {
      totalScore += parseInt(answer.score);
    });

    if(highScore < totalScore){
      highScore = totalScore;
    }
    allAnswers = allAnswers.concat({ 
      page: page,
      totalScore: totalScore
    });
  }
  let resultParams = {};
  const results = allAnswers.filter(allAnswer => allAnswer.totalScore === highScore);
  if(inspection.data){
    const { inspection_idx } = inspection.data;
    resultParams = {
      inspection_idx: inspection_idx,
      results: results
    }

  }
  
  return (
    <>
      {JSON.stringify(resultParams)}
    </>
  )
}

export default ResultPage;