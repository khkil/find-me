import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getQuestions } from '../modules/question';
import * as resultAPI from '../api/resultAPI';
import Question from '../components/inspection/Question';
import { useLocation } from "react-router";
import { Form } from 'react-bootstrap'
import FooterPage from './common/FooterPage';
import ToolbarPage from './common/ToolbarPage';
import Loading from '../components/common/Loading';
import HeaderPage from './common/HeaderPage';
import Proceeding from '../components/common/Proceeding';

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
        console.error(e);
      })
    }, 3000);
  }

  const goNextPage = (e) => {
    const { userInfo, answerState } = state;
    const { inspection_idx, totalPages } = inspection.data;

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
    console.log(page);
    console.log(totalPages);
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
      history.push({
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
  const inspection = useSelector(state => state.inspection);
  const { data, loading, error } = useSelector(state => state.question);
  useEffect(() => {
    const inspection_idx = inspection.data.inspection_idx;
    setValidated(false);
    dispatch(getQuestions(inspection_idx, page));
    setUserAnswers([]);
  }, [page]);




  if (proceeding) return <Proceeding loading={proceeding} />;
  if (loading) return <Loading loading={loading}/>
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <div class="exam-wrap">
      
      <div class="exam-head"></div>
      <div className="board">
        <div class="board-frame01"></div>
        <div class="board-frame02"></div>
        <div class="board-frame03"></div>
        <div class="board-frame04"></div>
        <p class="txt-guide">평소의 나와 <strong>가까울 수록 10점</strong>에, <strong>가깝지 않을수록 1점</strong>에 체크해주세요.</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <ul class="exam-list">
            {data.map((question, index) => (
              <Question
                key={index}
                match={match}
                question={question}
                setUserAnswers={setUserAnswers}
                userAnswers={userAnswers}
                validated={validated} />
            ))}
          </ul>
          <button class="btn md white_gra btn-next">다음</button>
        </Form>
      </div>
    </div> 
  )
}

export default QuestionPage; 