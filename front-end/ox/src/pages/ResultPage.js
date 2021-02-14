import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from "react-router";
import { getUserResult } from '../modules/result'
import HeaderPage from './common/HeaderPage';
import FooterPage from './common/FooterPage';
import queryString from "query-string"
import KakaoShareButton from '../components/share/KakaoShareButton';
import Result from '../components/inspection/Result';
import FacebookShareButton from '../components/share/FacebookShareButton';
import NaverBlogShareButton from '../components/share/NaverBlogShareButton';
import img_logo from '../img/img_logo.png'
import logo from '../img/logo.png'

const ResultPage = ({ history }) => {

  const dispatch = useDispatch();
  const { state, search, pathname } = useLocation();
  const [shareUrl, setShareUrl] = useState('');
  const inspection = useSelector(state => state.inspection);

  const calculatedResults = (answerState) => {

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
        result_idx: result,
        totalScore: totalScore
      });
    }
    const results = allAnswers.filter(allAnswer => allAnswer.totalScore === highScore);
    console.log(results);
    return results.map(result => result.result_idx);
  }

  const getShareUrl = (result_idx) => {
    const url = window.location.origin + pathname + `?result_idx=${result_idx}`;
    return url;
  }

  const copyToClipboard = () => {
    const element = document.createElement('textarea');
    element.value = shareUrl;
    element.setAttribute('readonly', '');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);
    element.select();
    var returnValue = document.execCommand('copy');
    document.body.removeChild(element);
    if (!returnValue) {
      throw new Error('copied nothing');
    } else {
      alert('URL이 복사되었습니다')
    }
  }

  const goSite = () => {
    window.open("http://aptitude-x.com/");
  }
  const goHome = () => {
    history.push({ pathname: ('/') })
  }

  useEffect(() => {

    const { inspection_idx } = inspection.data;
    let result;
    if (state && state.answerState) {
      const { answerState } = state;
      result = calculatedResults(answerState)[0];

    } else if (search) {
      const query = queryString.parse(search);
      const { result_idx } = query;
      result = result_idx;
    }
    const params = {
      inspection_idx: inspection_idx,
      result_idx: result
    }
    setShareUrl(getShareUrl(result));
    dispatch(getUserResult(params));

  }, []);

  const { data, loading, error } = useSelector(state => state.result);
  if (loading) return null;
  if (error) return <Redirect path="/" />;
  if (!data) return null;
  if (data.length === 0) return <Redirect path="/" />;

  return (
    <>
      <HeaderPage />
      <div class="exam-wrap">
        <div class="exam-head"></div>
        <div class="board">
          <div class="board-frame01"></div>
          <div class="board-frame02"></div>
          <div class="board-frame03"></div>
          <div class="board-frame04"></div>

          <Result result={data[0]}/>
          <div class="share-btn-wrap">
            <KakaoShareButton shareUrl={shareUrl} />
            <NaverBlogShareButton shareUrl={shareUrl} />
            <FacebookShareButton shareUrl={shareUrl} />
            
            <button class="btn sm blue" onClick={copyToClipboard}>
              <i>
                <img src={process.env.PUBLIC_URL + "/images/btn_ico_url.png"} alt="" />
              </i>URL 복사
            </button>

            <button class="btn sm green" onClick={goSite}>
              <i>
                <img src={process.env.PUBLIC_URL + "/images/btn_ico_link.png"} alt="" />
              </i>한국진로적성센터 바로가기
            </button>
          </div>



        </div>

        <div class="exam-foot"></div>
        <img src="../img/mascot.png" alt="" class="mascot" />
        <div class="btn-wrap">
          <button class="btn lg white" style={{cursor: 'auto'}}>
            <img src={img_logo} alt="" />
          </button>
          <button class="btn lg white" style={{cursor: 'auto'}}>
            <img src={logo} alt="" />
          </button>
        </div>
      </div>


      {/* {data.map((result, index) => {
        return (
          <Result result={result} key={index} />
        )
      })}
      <div className="findme__result__share">
        <div className="findme__result__share__label">
          결과 공유하기
      </div>
        <div className="findme__result__share__buttons">
          <KakaoShareButton shareUrl={shareUrl}/>
          <NaverBlogShareButton shareUrl={shareUrl}/>
          <FacebookShareButton shareUrl={shareUrl}/>
          <button className="findme__result__share__buttons--link" onClick={copyToClipboard}>
            <img src={process.env.PUBLIC_URL + "/images/icons/url.png"} alt='url_share_image' />
          </button>
        </div>
      </div>

      <div className="findme__result__more">
        <div className="findme__result__more__text">
          내게 맞는 전공·직업·직무·학습법·교과목 등등<br />
          더 구체적으로 알고 싶다면
        </div>
        <button className="findme__result__back__button" onClick={goHome}>
          나도 찾으러가기
        </button>
        <button className="findme__result__more__button" onClick={goSite}>
          한국진로적성센터 바로가기
        </button>
      </div> */}
    </>
  )
}

export default ResultPage;