import React from 'react';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ text, number, answers, setUserAnswer, userAnswer }) => {

  return (
    <>
      <span>{number}. </span>
      <span>{text}</span>
      <AnswerPage answers={answers} setUserAnswer={setUserAnswer} userAnswer={userAnswer}/>
    </>
  )
}

export default Question;