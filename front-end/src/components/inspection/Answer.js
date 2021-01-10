import React from 'react';
import { Form } from 'react-bootstrap';

const Answer = ({ idx, text, question_idx, onChange }) => {

  return (
    <>
      <Form.Check inline label={text} type='radio' id={`inline-radio-${idx}`} name={`question_${question_idx}`} value={idx} onChange={onChange} />
    </>
  )
}

export default Answer;