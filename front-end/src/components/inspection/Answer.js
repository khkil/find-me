import React from 'react';
import { Form } from 'react-bootstrap';

const Answer = ( {idx, text, question_idx} ) => {

  return (
    
    <Form.Check inline label={text} type='radio' id={`inline-radio-${idx}`} name={`user_answer_${question_idx}`} value={idx} />
    
  )
}

export default Answer;