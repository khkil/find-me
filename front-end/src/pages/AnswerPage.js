import Answer from '../components/inspection/Answer';

const AnswerPage = ({ answers, userAnswer, setUserAnswer }) => {

  const onChange = (e) => {
    const { name, value } = e.target;

    setUserAnswer({
      ...userAnswer,
      [name]: value
    });
  }
  
  return (
    <>
      <div>
        {answers.map(({ answer_idx, answer_text, question_idx }, index) => (
          <Answer key={index} idx={answer_idx} text={answer_text} question_idx={question_idx} onChange={onChange} />
        ))}
        <br></br>
      </div>
    </>
  )
}

export default AnswerPage;