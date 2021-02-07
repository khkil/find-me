import React from 'react';
import AnswerPage from '../../pages/AnswerPage';

const Question = ({ match, question, userAnswers, setUserAnswers, validated }) => {

  const { question_text, result_idx, question_number, answers } = question;
  return (
    <li>
      <div class="txt-question">
        <span class="num">{question_number}</span>
        <p>{question_text}</p>
      </div>
      <AnswerPage 
        match={match}
        answers={answers} 
        result_idx={result_idx}
        userAnswers={userAnswers} 
        setUserAnswers={setUserAnswers} 
        validated={validated}
        />
    </li>
    /* <div className="findme__question__element__label">
      {question_text}
      <AnswerPage 
        answers={answers} 
        result_idx={result_idx}
        userAnswers={userAnswers} 
        setUserAnswers={setUserAnswers} 
        validated={validated}
        />
    </div> */
  )
}

export default Question;