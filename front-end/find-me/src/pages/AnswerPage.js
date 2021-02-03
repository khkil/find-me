import Answer from '../components/inspection/Answer';
import { Form } from 'react-bootstrap'
import { useState } from 'react';

const AnswerPage = ({ answers, userAnswers, setUserAnswers, result_idx, validated }) => {
  const [selectedVal, setselectedVal] = useState('');
  const onChange = (e) => {

    const { value } = e.target;
    const { question_idx, answer_score } = e.currentTarget.dataset;

    
    setselectedVal(value);
    setUserAnswers([
      ...userAnswers, {
        question_idx: question_idx,
        result_idx: result_idx,
        answer_idx: value,
        score: answer_score,

      }
    ]);
    userAnswers.map(userAnswer => {
      
      if (question_idx === userAnswer.question_idx) {
        const newAnswers = userAnswers.filter(newAnswer => newAnswer.question_idx !== question_idx);

        setUserAnswers([...newAnswers,
        {
          question_idx: question_idx,
          result_idx: result_idx,
          answer_idx: value,
          score: answer_score,
        }
        ]);
        return false;
      }
    })
  }

  return (
    <Form.Group>
      <div className="findme__question__element__options">
        
          {answers.map((answer, index) => (
            <Answer
              key={index}
              index={index}
              answer={answer}
              onChange={onChange} />
          ))}
          <br/>
      </div>
      <div className="invalid-feedback-custom">{(!selectedVal && validated) && '문항을 체크해주세요'}</div>
    </Form.Group>
  )
}

export default AnswerPage;