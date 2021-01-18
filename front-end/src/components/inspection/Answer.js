import React from 'react';
import { Form } from 'react-bootstrap'

const Answer = ({ idx, text, answer_score, question_idx, onChange }) => {

  return (
    <div className="findme__question__element__option">
      <label className="findme__question__element__option" htmlFor={`answer_${idx}`}>
        <input
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
      </label>
      
    
    </div>
  )
}

export default Answer;