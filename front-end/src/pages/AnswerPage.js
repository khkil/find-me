import React from 'react';
import Answer from '../components/inspection/Answer';

const AnswerPage = ({ answers }) => {

  return (
    <>
      <div>
        {answers.map(({ answer_idx, answer_text, question_idx }, index) => (
          <Answer key={index} idx={answer_idx} text={answer_text} question_idx={question_idx} />
        ))}
      </div>
    </>
  )
}

export default AnswerPage;