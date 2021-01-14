import React from 'react';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ text, number, answers, setUserAnswers, userAnswers, type }) => {

  return (
    <div>
      <span>{number}. </span>
      <span>{text}</span>
      <AnswerPage answers={answers} setUserAnswers={setUserAnswers} userAnswers={userAnswers} type={type}/>
    </div>
  )
}

export default Question;