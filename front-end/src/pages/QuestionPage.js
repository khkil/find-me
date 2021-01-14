import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../components/common/Loading';
import { getQuestions } from '../modules/question'
import { Row, Form, Button } from 'react-bootstrap';
import Question from '../components/inspection/Question';
import { useLocation } from "react-router";
import CardPage from './CardPage';


const QuestionPage = ({ match, history }) => {

  const dispatch = useDispatch();
  const page = parseInt(match.params.page);

  const { state } = useLocation();
  const [ userAnswers, setUserAnswers ] = useState([]);
  console.log(state.answerState);
  useEffect(() => {
    setUserAnswers([]);
    dispatch(getQuestions(page));
  }, [page]);

  const { data, loading, error } = useSelector(state => state.question);
  const inspection = useSelector(state => state.inspection);
  
  const goNextPage = (e) => {
    e.preventDefault();
    const { userInfo, answerState } = state;
    const  { totalPages }  = inspection.data && inspection.data;
    const nextPageNum = page + 1;

    //To-do : 마지막 페이지일때 버튼 db저장

    history.push({
      pathname: (page < totalPages ? `/pages/${nextPageNum}` : '/pages/result'), 
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

  if(!state || !state.userInfo) return <Redirect to= "/"/>;
  if (loading || !data) return <Loading loading={loading} />
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return (
    <>
      <CardPage/>
      <Form name='question_form' style={{padding: '10%'}}>
        {data.map(({ question_idx, question_text, answers, question_number }) => (
          <Question
            key={question_idx} 
            number={question_number} 
            text={question_text} 
            answers={answers} 
            question_idx={question_idx} 
            setUserAnswers={setUserAnswers} 
            userAnswers={userAnswers} />
        ))}
        <Row className="justify-content-md-center">
          <h2>{JSON.stringify(userAnswers)}</h2>
          <Button variant="secondary" type="submit"size="lg" onClick={goNextPage}>
            다음
          </Button>
        </Row>
      </Form> 
      
    </>
  )
}

export default QuestionPage; 