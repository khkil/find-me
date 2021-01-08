import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/common/Loading';
import { getQuestions } from '../modules/question'
import { Container, Row, Col, Form } from 'react-bootstrap';
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
     {/*  <Row>
        <Col>1 of 1</Col>
      </Row> */}
      <Form name='question_form'>
        {/* <div key={`inline-radio`} className="mb-3">
          <Answer text='test' idx='123'/>
        </div>
        <AnswerList answers={data}/> */}
        {data.map(({ question_idx, question_text, answers, question_number }) => (
          <Question number={question_number} text={question_text} key={question_idx} answers={answers} />
        ))}


      </Form>


    </Container>
  )
}

export default QuestionPage; 