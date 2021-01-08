import React from 'react';
import { Form } from 'react-bootstrap';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ text, number, answers }) => {

  return (
    <>
      <span>{number}. </span>
      <span>{text}</span>
      <AnswerPage answers={answers}/>
    </>
  )
}

export default Question;