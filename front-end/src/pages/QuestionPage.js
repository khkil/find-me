import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../components/common/Loading';
import { getQuestions } from '../modules/question';
import { insertUserResult } from '../modules/result';
import * as resultAPI from '../api/resultAPI';
import Question from '../components/inspection/Question';
import { useLocation } from "react-router";
import { Form } from 'react-bootstrap'
import FooterPage from './common/FooterPage';
import ToolbarPage from './common/ToolbarPage';
import '../css/question.css'
import HeaderPage from './common/HeaderPage';

const PUBLIC_URL = process.env.PUBLIC_URL;
const QuestionPage = ({ match, history }) => {

  const dispatch = useDispatch();
  const page = parseInt(match.params.page);
  const { state } = useLocation();
  const [validated, setValidated] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [proceeding, setProceeding] = useState(false);

  const insertUserResult = (params, userState) => {

    setProceeding(true);
    setTimeout(() => {
      resultAPI.insertUserResult(params).then(({ data }) => {
        const { success } = data;
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
        console(e);
      })
    }, 500)

  }

  const goNextPage = (e) => {
    const { userInfo, answerState } = state;
    const { totalPages } = inspection.data && inspection.data;

    let answers = {};
    for (const userAnswer of userAnswers) {
      const { result_idx } = userAnswer;
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
    const isLastPage = (page === totalPages);
    if (isLastPage) {
      let userAllAnswers = [];
      for (const [key, value] of Object.entries(userState.answerState)) {
        userAllAnswers = [...userAllAnswers, ...value];

      }
      const params = {
        user_info: userInfo,
        user_answers: userAllAnswers
      }
      insertUserResult(params, userState);

    } else {
      history.replace({
        pathname: (isLastPage ? '/pages/result' : `/pages/${page + 1}`),
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


  const { data, loading, error } = useSelector(state => state.question);
  const inspection = useSelector(state => state.inspection);

  if (!state || !state.userInfo) return <Redirect to="/" />;
  if (loading || !data || proceeding) return <Loading loading={loading || proceeding} />
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;




  return (
    <>
      <HeaderPage/>
        <div className="findme__question__explanation">
          평소의 나와 가장 가까울 수록 10점에 가깝게,<br />
          평소의 나와 같지 않을 수록 1점에 가깝게 체크하세요.
        </div>
        <ToolbarPage match={match} />
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="information_form">
          <div className="findme__question__wrapper">
            <div className="findme__question__element">
              {data.map(({ question_idx, question_text, result_idx, answers, question_number }) => (
                <Question
                  key={question_idx}
                  number={question_number}
                  result_idx={result_idx}
                  text={question_text}
                  answers={answers}
                  question_idx={question_idx}
                  setUserAnswers={setUserAnswers}
                  userAnswers={userAnswers}
                  validated={validated} />
              ))}
            </div>
          </div>
          <div className="findme__common__next">
            <button type="submit" className="findme__common__next__button">
              NEXT
            <img className="findme__common__next__button--image" src={PUBLIC_URL + '/images/icons/next.svg'} alt="next" />
            </button>
          </div>
        </Form>
      <FooterPage/>
    </>
  )
}

export default QuestionPage; 