import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getQuestions} from '../modules/question';
import * as userApi from '../api/userAPI';
import Question from '../components/inspection/Question';
import {useLocation} from "react-router";
import {Form} from 'react-bootstrap'
import FooterPage from './common/FooterPage';
import ToolbarPage from './common/ToolbarPage';
import Loading from '../components/common/Loading';
import HeaderPage from './common/HeaderPage';
import '../css/question.css'
import Proceeding from '../components/common/Proceeding';
import {getTermsList} from "../api/termsAPI";

const PUBLIC_URL = process.env.PUBLIC_URL;
const QuestionPage = ({match, history}) => {

  const dispatch = useDispatch();
  const page = parseInt(match.params.page);
  const {state} = useLocation();
  const [validated, setValidated] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [proceeding, setProceeding] = useState(false);
  const insertUserResult = (params, userState) => {
    userApi.insertUserAnswer(params).then(({data}) => {
      const {success} = data;
      if (success) {
        history.replace({
          pathname: ('/pages/user/privacy'),
          state: userState
        });
      } else {
        alert('정보 저장에 실패 하였습니다');
      }
    }).catch(e => {
      alert('서버와 통신오류가 발생하였습니다.');
      console.error(e);
    })
    /* setProceeding(true);
     setTimeout(() => {
       userApi.insertUserAnswer(params).then(({data}) => {
         const {success} = data;
         if (success) {
           history.replace({
             pathname: ('/pages/result'),
             state: userState
           });
         } else {
           alert('정보 저장에 실패 하였습니다');
         }
       }).catch(e => {
         alert('서버와 통신오류가 발생하였습니다.');
         console.error(e);
       })
     }, 3000);*/
  }
  
  const goNextPage = (e) => {
    const {userInfo, answerState} = state;
    const {inspection_idx, totalPages} = inspection.data && inspection.data;

    let answers = {};
    for (const userAnswer of userAnswers) {
      const {result_idx} = userAnswer;
      const key = `result_${result_idx}`;
      if (!answers[key]) {
        answers[key] = [userAnswer];
      } else {
        answers[key] = [...answers[key], userAnswer]
      }
    }
    const userState = {
      userInfo: userInfo,
      answerState: {
        ...answerState,
        ...answers
      }
    }
    const isLastPage = (page === 1);
    if (isLastPage) {
      let userAllAnswers = [];
      for (const [key, value] of Object.entries(userState.answerState)) {
        userAllAnswers = [...userAllAnswers, ...value];

      }
      const params = {
        inspection_idx: inspection_idx,
        user_info: userInfo,
        user_answers: userAllAnswers
      }
      insertUserResult(params, userState);

    } else {
      history.replace({
        pathname: `/pages/${page + 1}`,
        state: userState
      })

    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
    } else {
      goNextPage();
    }
  };

  useEffect(() => {
    setValidated(false);
    setUserAnswers([]);
    dispatch(getQuestions(page));
  }, [page]);


  const {data, loading, error} = useSelector(state => state.question);
  const inspection = useSelector(state => state.inspection);

  if (!state || !state.userInfo) return <Redirect to="/"/>;
  if (loading) return <Loading loading={loading}/>;
  if (proceeding) return <Proceeding loading={proceeding}/>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <HeaderPage/>
      <div className="findme__question__explanation">
        평소의 <b>나와 가장 가까울 수록 6점에 가깝게,</b><br/>
        평소의 <b>나와 같지 않을 수록 1점에 가깝게</b> 체크하세요.
      </div>
      <ToolbarPage match={match}/>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="information_form">
        <div className="findme__question__wrapper">
          <div className="findme__question__element">
            {data.map((question, index) => (
              <Question
                key={index}
                question={question}
                setUserAnswers={setUserAnswers}
                userAnswers={userAnswers}
                validated={validated}/>
            ))}
          </div>
        </div>
        <div className="findme__common__next">
          <button type="submit" className="findme__common__next__button">
            NEXT
            <img className="findme__common__next__button--image" src={PUBLIC_URL + '/images/icons/next.svg'} alt="next"/>
          </button>
        </div>
      </Form>
      <FooterPage/>
    </>
  )
}

export default QuestionPage; 