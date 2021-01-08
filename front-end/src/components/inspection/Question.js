import React from 'react';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ text, number, answers, question_idx }) => {

  return (
    <>
      <span>{number}. </span>
      <span>{text}</span>
      <AnswerPage answers={answers} number={number} question_idx={question_idx}/>
    </>
  )
}

export default Question;