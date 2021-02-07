import React from 'react';

const Answer = ({ answer, onChange }) => {

  const { answer_idx, answer_score, answer_text, question_idx } = answer;
  return (
    <>
     {/* <label className="findme__question__element__option" htmlFor={`answer_${answer_idx}`}>
        <input
          type='radio'
          id={`answer_${answer_idx}`}
          name={`question_${question_idx}`}
          className="dpN"
          value={answer_idx}
          label={answer_text}
          data-answer_score={answer_score}
          data-question_idx={question_idx}
          onChange={onChange} 
          required/>
        <div className="findme__question__element__option-Checker"></div>
        {answer_text}
      </label> */}
      <label  htmlFor={`answer_${answer_idx}`}>
      <input
          type='radio'
          id={`answer_${answer_idx}`}
          name={`question_${question_idx}`}
          className="dpN"
          value={answer_idx}
          label={answer_text}
          data-answer_score={answer_score}
          data-question_idx={question_idx}
          onChange={onChange} 
          required/>
          <span>{answer_text}</span>
      </label>
    </>
  )
}

export default Answer;