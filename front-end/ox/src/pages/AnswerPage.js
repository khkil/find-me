import Answer from '../components/inspection/Answer';
import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';

const AnswerPage = ({ match, answers, userAnswers, setUserAnswers, result_idx, validated }) => {
  const [selectedVal, setSelectedVal] = useState('');
  const { page } = match.params;
  const onChange = (e) => {

    const { value } = e.target;
    const { question_idx, answer_score } = e.currentTarget.dataset;

    
    setSelectedVal(value);
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

  useEffect(() => {
    setSelectedVal('');
  }, [page])
 

  return (
    <Form.Group className="radio-wrap">
          {selectedVal}
          {answers.map((answer, index) => (
            <Answer
              key={index}
              index={index}
              answer={answer}
              onChange={onChange} />
          ))}
          <br/>
      <div className="invalid-feedback-custom">{(!selectedVal && validated) && '문항을 체크해주세요'}</div> 
    </Form.Group>
  )
}

export default AnswerPage;