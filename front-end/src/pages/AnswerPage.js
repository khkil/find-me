import React, { useState } from 'react';
import Answer from '../components/inspection/Answer';

const AnswerPage = ({ answers, userAnswers, setUserAnswers }) => {

  const onChange = (e) => {
    const { name, value } = e.target;

    setUserAnswers([
      ...userAnswers
      ,{ [name]: value }
    ]);

    userAnswers.map((userAnswer) => {
      for(const key in userAnswer){
        if(key === name){
          const chnagedAnswers = userAnswers.filter((chnagedAnswer) => chnagedAnswer !== userAnswer);
          setUserAnswers([...chnagedAnswers, { [name]: value }]);
        }
      }
    });
  }
  
  return (
    <>
      <div>
        {answers.map(({ answer_idx, answer_text, question_idx }, index) => (
          <Answer key={index} idx={answer_idx} text={answer_text} question_idx={question_idx} onChange={onChange} />
          /* <label htmlFor="asdf" key={index} >
            <input
              type="radio"
              id="asdf2"
              name={question_idx}
              value={answer_idx}
              //checked={Q1 === "asdf2" ? true : false}
              onChange={onChange}
            ></input>
            {answer_text}
          </label> */
        ))}
        <br></br>
      </div>
    </>
  )
}

export default AnswerPage;