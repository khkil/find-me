import React from 'react';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ question, userAnswers, setUserAnswers, validated }) => {

  const { questionText, resultIdx, answers } = question;
  return (
    <div className="findme__question__element__label">
      {questionText}
      <AnswerPage 
        answers={answers} 
        result_idx={resultIdx}
        userAnswers={userAnswers} 
        setUserAnswers={setUserAnswers} 
        validated={validated}
        />
    </div>
  )
}

export default Question;