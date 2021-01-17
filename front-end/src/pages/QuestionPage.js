import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loading from '../components/common/Loading';
import { getQuestions } from '../modules/question'
import Question from '../components/inspection/Question';
import { useLocation } from "react-router";
import { Form } from 'react-bootstrap'
import FooterPage from './common/FooterPage';
import ToolbarPage from './common/ToolbarPage';
import '../css/question.css'

const PUBLIC_URL = process.env.PUBLIC_URL;
const QuestionPage = ({ match, history }) => {

  const dispatch = useDispatch();
  const page = parseInt(match.params.page);
  const { state } = useLocation();
  const [validated, setValidated] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const goNextPage = (e) => {
    const { userInfo, answerState } = state;
    const { totalPages } = inspection.data && inspection.data;
    const nextPageNum = page + 1;

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


    //To-do : 마지막 페이지일때 버튼 db저장
    history.push({
      pathname: (page < totalPages ? `/pages/${nextPageNum}` : '/pages/result'),
      state: {
        userInfo: userInfo,
        answerState: {
          ...answerState,
          ...answers
        }
      }
    });
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

    setUserAnswers([]);
    dispatch(getQuestions(page));
  }, [page]);

  console.log(state);

  const { data, loading, error } = useSelector(state => state.question);
  const inspection = useSelector(state => state.inspection);

  if (!state || !state.userInfo) return <Redirect to="/" />;
  if (loading || !data) return <Loading loading={loading} />
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;



  return (
    <>
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
                userAnswers={userAnswers} />
            ))}
          </div>
        </div>
        {/* <h2>{JSON.stringify(userAnswers)}</h2> */}
        <div className="findme__common__next">
          <button type="submit" className="findme__common__next__button">
            NEXT
          <img className="findme__common__next__button--image" src={PUBLIC_URL + '/images/icons/next.svg'} alt="next" />
          </button>
        </div>
      </Form>
      <FooterPage />

    </>
  )
}

export default QuestionPage; 