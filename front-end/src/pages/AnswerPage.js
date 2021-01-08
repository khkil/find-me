import React from 'react';
import { Form } from 'react-bootstrap';
import Answer from '../components/inspection/Answer';

const AnswerPage = ({ answers }) => {

  return (
    <>
      <div>
        {answers.map(({ answer_idx, answer_text, answer_value }, index) => (
          <Answer key={index} idx={answer_idx} text={answer_text} />
        ))}
      </div>
    </>
  )
}

export default AnswerPage;