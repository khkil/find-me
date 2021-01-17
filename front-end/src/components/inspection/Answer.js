import React from 'react';
import { Form } from 'react-bootstrap'

const Answer = ({ idx, text, answer_score, question_idx, onChange, index }) => {

  return (
    <div className="findme__question__element__option">
      <label className="findme__question__element__option" htmlFor={`answer_${idx}`}>
        <Form.Control 
          type='radio'
          id={`answer_${idx}`}
          name={`question_${question_idx}`}
          className="dpN"
          value={idx}
          label={text}
          data-answer_score={answer_score}
          data-question_idx={question_idx}
          onChange={onChange} 
          required/>
        <div className="findme__question__element__option-Checker"></div>
        {text}
        {index === 0 && <Form.Control.Feedback type="invalid">성별을 선택해주세요</Form.Control.Feedback>}
      </label>
      
    
    </div>
  )
}

export default Answer;