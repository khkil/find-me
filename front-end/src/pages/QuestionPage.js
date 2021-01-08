import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/common/Loading';
import { getQuestions } from '../modules/question'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Question from '../components/inspection/Question';


const QuestionPage = ({ match }) => {
  const page = match.params.page;
  const { data, loading, error } = useSelector(state => state.question);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestions(page));
  }, [page]);

  if (loading && !data) return <Loading loading={loading} />
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return (
    <Container>
      <Form name='question_form'>
       
        {data.map(({ question_idx, question_text, answers, question_number }) => (
          <Question number={question_number} text={question_text} key={question_idx} answers={answers} question_idx={question_idx} />
        ))}
      </Form> 
      
    </Container>
  )
}

export default QuestionPage; 