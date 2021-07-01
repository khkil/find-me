import React from 'react';

const Answer = ({ answer, onChange }) => {

  const { answerIdx, answerScore, answerText, questionIdx } = answer;
  return (
    <div className="findme__question__element__option">
     <label className="findme__question__element__option" htmlFor={`answer_${answerIdx}`}>
        <input
          type='radio'
          id={`answer_${answerIdx}`}
          name={`question_${questionIdx}`}
          className="dpN"
          value={answerIdx}
          label={answerText}
          data-answer_score={answerScore}
          data-question_idx={questionIdx}
          onChange={onChange} 
          required/>
        <div className="findme__question__element__option-Checker"></div>
        {answerText}
      </label>
      
    
    </div>
  )
}

export default Answer;