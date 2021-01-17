import Answer from '../components/inspection/Answer';
import { Form } from 'react-bootstrap'

const AnswerPage = ({ answers, userAnswers, setUserAnswers, result_idx }) => {

  const onChange = (e) => {
    const { value } = e.target;
    const { question_idx, answer_score } = e.currentTarget.dataset;

    setUserAnswers([
      ...userAnswers, {
        question: question_idx,
        result_idx: result_idx,
        answer: value,
        score: answer_score,

      }
    ]);
    userAnswers.map(userAnswer => {
      const { question } = userAnswer;
      if (question_idx === question) {
        const newAnswers = userAnswers.filter(newAnswer => newAnswer.question !== question_idx);

        setUserAnswers([...newAnswers,
        {
          question: question_idx,
          result_idx: result_idx,
          answer: value,
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
        {answers.map(({ answer_idx, answer_text, answer_score, question_idx }, index) => (
          <Answer
            key={index}
            index={index}
            idx={answer_idx}
            text={answer_text}
            answer_score={answer_score}
            question_idx={question_idx}
            onChange={onChange} />
        ))}
        
      </div>
    </Form.Group>
  )
}

export default AnswerPage;