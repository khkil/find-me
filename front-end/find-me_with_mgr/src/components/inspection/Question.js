import React from 'react';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ question, userAnswers, setUserAnswers, validated }) => {

  const { question_text, result_idx, answers } = question;
  return (
    <div className="findme__question__element__label">
      {question_text}
      <AnswerPage 
        answers={answers} 
        result_idx={result_idx}
        userAnswers={userAnswers} 
        setUserAnswers={setUserAnswers} 
        validated={validated}
        />
    </div>
  )
}

export default Question;