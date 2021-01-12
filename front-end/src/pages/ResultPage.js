import React from 'react';
import { useLocation } from "react-router";
import { Redirect } from 'react-router-dom';

const ResultPage = ({ match }) => {
  const { state } = useLocation();
  if(!state || !state.userInfo) return <Redirect to= "/"/>;
  const { userInfo, answerState } = state; 
  let resultScore = 0;

  for(const key in answerState){
    const pageNum = key.replace('page_', '');
    const { answers } = answerState[key];
    let totalScore = 0;
    answers.forEach(answer => {
      totalScore += parseInt(answer.score);
    });

    if(resultScore < totalScore){
      resultScore = totalScore;
    }
  }

  
  return (
    <>
      {JSON.stringify(resultScore)}
    </>
  )
}

export default ResultPage;