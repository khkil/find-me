import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../components/common/Loading';
import { getQuestions } from '../modules/question'
import { Container, Row, Form, Button } from 'react-bootstrap';
import Question from '../components/inspection/Question';
import { useLocation } from "react-router";


const QuestionPage = ({ match, history }) => {

  const { state } = useLocation();
  useEffect(() => {
    if(!state || !state.userInfo){
     history.push('/pages/user');
    }else{
      console.log(state.answerState);
    }
  }, [state]);
  const [ userAnswers, setUserAnswers ] = useState([]);

  
  const page = parseInt(match.params.page);
  const goNextPage = (e) => {
    e.preventDefault();
    const { userInfo, answerState } = state;
    const nextPageNum = page + 1;
    history.push({
      pathname: `/pages/${nextPageNum}`, 
      state: { 
        userInfo: userInfo,  
        answerState: { 
          ...answerState, 
          ['page_'+page]: {
            answers: userAnswers
          }
         } 
      }
    });
  }

  const { data, loading, error } = useSelector(state => state.question);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestions(page));
  }, [page]);

  console.log(data);

  if (loading || !data) return <Loading loading={loading} />
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return (
    <Container>
      <Form name='question_form'>
        {data.map(({ question_idx, question_text, answers, question_number, state }) => (
          <Question number={question_number} text={question_text} key={question_idx} answers={answers} question_idx={question_idx} state={state} setUserAnswers={setUserAnswers} userAnswers={userAnswers} />
        ))}
        <Row className="justify-content-md-center">
          <h2>{JSON.stringify(userAnswers)}</h2>
          <Button variant="primary" type="submit"size="lg" onClick={goNextPage}>
            다음
          </Button>
        </Row>
      </Form> 
      
    </Container>
  )
}

export default QuestionPage; 