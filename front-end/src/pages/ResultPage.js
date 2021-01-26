import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router";
import { Redirect } from 'react-router-dom';
import { getUserResult } from '../modules/result'
import Loading from '../components/common/Loading';
import '../css/result.css'
import HeaderPage from './common/HeaderPage';
import FooterPage from './common/FooterPage';
import { Helmet } from 'react-helmet';
import KakaoShareButton from '../components/share/KakaoShareButton';
import Result from '../components/inspection/Result';

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
    dispatch(getUserResult(params));

  }, []);

  const { data, loading, error } = useSelector(state => state.result);
  if (loading || !data) return <Loading loading={loading} />
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <Helmet>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </Helmet>
      <HeaderPage/>
      {data.map((result, index) => {
        return (
          <Result result={result} key={index}/>
        )
      })}
      <div className="findme__result__share">
        <div className="findme__result__share__label">
          결과 공유하기
      </div>
        <div className="findme__result__share__buttons">
          <button className="findme__result__share__buttons--kakao">
            <img src={process.env.PUBLIC_URL + "/images/icons/kakao.png"} alt='kakao_share_image'/>
          </button>
          <button class="findme__result__share__buttons--link">
            <img src={process.env.PUBLIC_URL + "/images/icons/blog.png"} alt='blog_share_image'/>
          </button>
          <button class="findme__result__share__buttons--link">
            <img src={process.env.PUBLIC_URL + "/images/icons/facebook.png"} alt='facebook_share_image'/>
          </button>
          <button className="findme__result__share__buttons--link">
            <img src={process.env.PUBLIC_URL + "/images/icons/url.png"} alt='url_share_image'/>
          </button>
          {/* <KakaoShareButton/> */}
        </div>
      </div>

      <div className="findme__result__more">
        <div className="findme__result__more__text">
          내게 맞는 전공·직업·직무·학습법·교과목 등등<br />
          더 구체적으로 알고 싶다면
        </div>
        <button className="findme__result__more__button">
            한국진로적성센터 바로가기
        </button>
      </div>
      <FooterPage/>
    </>
  )
}

export default ResultPage;