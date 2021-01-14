import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { Redirect } from 'react-router-dom';

const Resulttype = () => {
  const inspection = useSelector(state => state.inspection);
  const { state } = useLocation();
  if(!state || !state.userInfo) return <Redirect to= "/"/>;
  const { answerState } = state; 
  let highScore = 0;
  let allAnswers = [];
  console.log(answerState);

  for(const key in answerState){
    const type = key.replace('type_', '');
    const answers = answerState[key];
    let totalScore = 0;
    answers.forEach(answer => {
      totalScore += parseInt(answer.score);
    });

    if(highScore < totalScore){
      highScore = totalScore;
    }
    allAnswers = allAnswers.concat({ 
      type: type,
      totalScore: totalScore
    });
  }
  let resultMap = {};
  const results = allAnswers.filter(allAnswer => allAnswer.totalScore === highScore);
  if(inspection.data){
    const { inspection_idx } = inspection.data;
    resultMap = {
      inspection_idx: inspection_idx,
      types: results.map(result => result.type)
    }
  }
  return (
    <>
      {JSON.stringify(resultMap)} 
    </>
  )
}

export default Resulttype;