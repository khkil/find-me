import React from 'react';
import { Form } from 'react-bootstrap';

const Answer = ( {idx, text} ) => {

  return (
    
    <Form.Check inline label={text} type='radio' id={`inline-radio-${idx}`} name='user_answer' value={idx} />
    
  )
}

export default Answer;