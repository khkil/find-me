import React from 'react';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ text, number, answers, setUserAnswers, userAnswers, result_idx }) => {

  return (
    <div>
      <span>{number}. </span>
      <span>{text}</span>
      <AnswerPage answers={answers} setUserAnswers={setUserAnswers} userAnswers={userAnswers} result_idx={result_idx}/>
    </div>
  )
}

export default Question;