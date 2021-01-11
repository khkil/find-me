import React from 'react';
import { Form } from 'react-bootstrap';

const Answer = ({ idx, text, answer_score, question_idx, onChange }) => {

  return (
    <>
      <Form.Check inline 
      type='radio' 
      label={text} 
      name={`question_${question_idx}`} 
      value={idx} 
      data-answer_score={answer_score}
      data-question_idx={question_idx} 
      onChange={onChange} />
    </>
  )
}

export default Answer;