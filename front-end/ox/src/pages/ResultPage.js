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
    return results.map(result => result.result_idx);
  }

  const getShareUrl = (results) => {
    /*  let url = window.location.origin + pathname;
     const key = 'result_idx';
     url += `?${key}=${results.join(`&${key}=`)}`; */
    const url = window.location.origin + pathname + `?result_idx=${results[0]}`;
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
    let results = [];
    if (state && state.answerState) {
      const { answerState } = state;
      results = [calculatedResults(answerState)[0]];

    } else if (search) {
      const query = queryString.parse(search);
      const { result_idx } = query;
      const value = typeof result_idx === 'string' ? [result_idx] : [result_idx[0]]
      results = value;
    }
    const params = {
      inspection_idx: inspection_idx,
      results: results
    }
    setShareUrl(getShareUrl(results));
    dispatch(getUserResult(params));

  }, []);

  const { data, loading, error } = useSelector(state => state.result);
  if (loading) return null;
  if (error) return <Redirect path="/" />;
  if (!data ) return null;
  if(data.length === 0) return <Redirect path="/" />;

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

          <div class="user-result">
            <div class="img-wrap">
              <img src="../img/img_type01.png" alt="" />
            </div>
            <div class="txt-wrap">
              <p class="tit">당신은 리더십이 뛰어난 <strong> ‘나를따르소’ </strong></p>
              <ul>
                <li>당신은 눈에 보이는 자연, 환경, 기상 천문, 우주에 관심이 많습니다.</li>
                <li>말 수가 적고 조용하며 느리지만 뛰어난 관찰력을 갖고 있습니다.</li>
                <li>안정적이고 편안한 환경 속에서 성과를 낼 수 있습니다.</li>
                <li>자신만의 분명한 관심 영역을 확보하고 있으며, 관심 있는 분야에는 오랫동안 집중합니다.</li>
                <li>소리 없이 자신의 일을 묵묵하게 수행해냅니다.</li>
              </ul>
            </div>
          </div>
          <div class="relation-result">
            <div class="good-type">
              <div class="inner">
                <p class="txt-type">잘맞소</p>
                <div class="img-wrap">
                  <img src="../img/img_type02.png" alt="" />
                </div>
              </div>
            </div>
            <div class="bad-type">
              <div class="inner">
                <p class="txt-type">안맞소</p>
                <p class="txt-ex">생각많고 걱정많은 <strong>‘탐정같소’</strong></p>
                <div class="img-wrap">
                  <img src="../img/img_type03.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="share-btn-wrap">
            <KakaoShareButton shareUrl={shareUrl}/>
            <button class="btn sm white crl-litegreen"><i><img src="../img/btn_ico_blog.png" alt="" /></i>네이버블로그 공유</button>
            <button class="btn sm white crl-blue"><i><img src="../img/btn_ico_facebook.png" alt="" /></i>페이스북 공유</button>
            <button class="btn sm blue"><i><img src="../img/btn_ico_url.png" alt="" /></i>URL 복사</button>
            <button class="btn sm green"><i><img src="../img/btn_ico_link.png" alt="" /></i>한국진로적성센터 바로가기</button>
          </div>
        </div>          
{shareUrl}

        <div class="exam-foot"></div>
        <img src="../img/mascot.png" alt="" class="mascot" />
        <div class="btn-wrap">
          <button class="btn lg white"><img src="../img/img_logo.png" alt="" /></button><button class="btn lg white"><img src="../img/logo.png" alte="" /></button>
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
      <FooterPage />
    </>
  )
}

export default ResultPage;