import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { Redirect } from 'react-router-dom';
import { gerUserResult } from '../modules/result'
import Loading from '../components/common/Loading';
import { Row, Col, Carousel, Card } from 'react-bootstrap';
import '../css/result.css'

const makeStringArr = (str) => {
  const tag = '</br>';
  return str.split(tag);
}

const ResultPage = () => {

  const inspection = useSelector(state => state.inspection);
  const { state } = useLocation();
  const dispatch = useDispatch();


  useEffect(() => {

    if (!state || !state.userInfo) return <Redirect to="/" />;
    const { answerState } = state;
    let highScore = 0;
    let allAnswers = [];

    for (const key in answerState) {
      const result = key.replace('result_', '');
      const answers = answerState[key];
      let totalScore = 0;
      answers.forEach(answer => {
        totalScore += parseInt(answer.score);
      });

      if (highScore < totalScore) {
        highScore = totalScore;
      }
      allAnswers = allAnswers.concat({
        result: result,
        totalScore: totalScore
      });
    }

    const results = allAnswers.filter(allAnswer => allAnswer.totalScore === highScore);
    const { inspection_idx } = inspection.data;
    const params = {
      inspection_idx: inspection_idx,
      results: results.map(result => result.result)
    }
    dispatch(gerUserResult(params));


  }, []);

  const { data, loading, error } = useSelector(state => state.result);
  if (loading || !data) return <Loading loading={loading} />
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (

    <>
      {data.map(({ result_idx, result_name, result_title, main_sentence, sub_sentence, keyword1, keyword2 }, index) => {
        return (

          <div className="findme__result" key={index}>

            <div className="findme__result__title">
              <strong dangerouslySetInnerHTML={{ __html: result_title }} /><br />
              <span className="findme__result__title--highlight">{result_name}</span>
            </div>
            <div className="findme__result__illustration">
              <img
                src={process.env.PUBLIC_URL + `/images/illustration/result-img-${result_idx}.png`}
                alt="result illustration"
                className="findme__result__illustration__image" />
              <div className="findme__result__illustration__explanation">
                <span dangerouslySetInnerHTML={{ __html: main_sentence }} />
              </div>
            </div>
            <div className="findme__result__detail">
              {makeStringArr(sub_sentence).map((str, index) => {
                return (
                  <div className="findme__result__detail__element" key={index}>
                    {str}
                  </div>
                )
              })}
            </div>

            <div className="findme__result__pros-cons">
              <div className="findme__result__pros-cons__label">
                관찰형의 강점 키워드
              </div>
              {makeStringArr(keyword1).map((str, index) => {
                return (
                  <div className="findme__result__pros-cons__element" key={index}>
                    #{str}
                  </div>
                )
              })}
            </div>
            <div className="findme__result__pros-cons">
              <div className="findme__result__pros-cons__label">
                관찰형의 약점 키워드
              </div>
              {makeStringArr(keyword2).map((str, index) => {
                return (
                  <div className="findme__result__pros-cons__element" key={index}>
                    #{str}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className="findme__result__share">
        <div className="findme__result__share__label">
          결과 공유하기
      </div>
        <div className="findme__result__share__buttons">
          <button className="findme__result__share__buttons--kakao">
            <img src={process.env.PUBLIC_URL + "/images/icons/kakao.png"} />
          </button>
          <button className="findme__result__share__buttons--link">
            <img src={process.env.PUBLIC_URL + "/images/icons/url.png"} />
          </button>
        </div>
      </div>

      <div className="findme__result__more">
        <div className="findme__result__more__text">
          내게 맞는 전공·직업·직무·학습법·교과목 등등<br />
        더 구체적으로 알고 싶다면,
      </div>
        <button className="findme__result__more__button">
          한국진로적성센터 바로가기
      </button>
      </div>

      <div className="findme__result__logos">
        <img className="findme__result__logos--octagnosis" src={process.env.PUBLIC_URL + "/images/logo-octagnosis.png"} alt="Korea career aptitude center" />
        <img className="findme__result__logos--kcac" src={process.env.PUBLIC_URL + '/images/logo.svg'} alt="Korea career aptitude center" />
      </div>
    </>
  )
}

export default ResultPage;