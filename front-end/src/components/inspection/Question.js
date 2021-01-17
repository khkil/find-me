import React from 'react';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ text, number, answers, setUserAnswers, userAnswers, result_idx }) => {

  return (
    <div className="findme__question__element__label">
      {text}
      <AnswerPage 
        answers={answers} 
        result_idx={result_idx}
        userAnswers={userAnswers} 
        setUserAnswers={setUserAnswers} 
        />
    </div>
  )
}

export default Question;