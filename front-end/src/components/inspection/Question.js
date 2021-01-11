import React from 'react';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ text, number, answers, setUserAnswers, userAnswers }) => {

  return (
    <>
      <span>{number}. </span>
      <span>{text}</span>
      <AnswerPage answers={answers} setUserAnswers={setUserAnswers} userAnswers={userAnswers}/>
    </>
  )
}

export default Question;