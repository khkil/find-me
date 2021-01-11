import Answer from '../components/inspection/Answer';

const AnswerPage = ({ answers, userAnswers, setUserAnswers }) => {

  const onChange = (e) => {
    const { value } = e.target;
    const  { question_idx, answer_score } = e.currentTarget.dataset; 

    setUserAnswers([
      ...userAnswers, { 
        question: question_idx,
        answer: value,
        score: answer_score
      }
      //[name]: value
    ]);
    userAnswers.map(userAnswer => {
      const { question } = userAnswer;
      if(question_idx === question){
        const newAnswers = userAnswers.filter(newAnswer => newAnswer.question !== question_idx);
        
        setUserAnswers([...newAnswers, 
          { 
            question: question_idx,
            answer: value,
            score: answer_score
          }
        ]);
        return false;
      }
    })

    console.log(userAnswers);
  }
  
  return (
    <>
      <div>
        {answers.map(({ answer_idx, answer_text, answer_score, question_idx }, index) => (
          <Answer key={index} idx={answer_idx} text={answer_text} answer_score={answer_score} question_idx={question_idx} onChange={onChange} />
        ))}
        <br></br>
      </div>
    </>
  )
}

export default AnswerPage;