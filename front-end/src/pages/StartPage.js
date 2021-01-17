import React from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css'
import FooterPage from './common/FooterPage';

const StartPage = () => {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  return (

    <>
      <div className="findme__main__title">
        나를 찾아줘!
        </div>
      <div className="findme__main__subtitle">
        10만 1천 4백명의 성공을 만든<br />
          옥타그노시스 검사의<br />
          '나를 찾아줘!' 버전을 지금 시작하세요!
        </div>
      <div className="findme__main__illustration">
        <img
          className="findme__main__illustration--image"
          alt="main illustration"
          src={PUBLIC_URL + '/images/illustration/main.png'} />
      </div>
      <div className="findme__main__start">
        <Link to={{ pathname: "/pages/user" }}>
          <button className="findme__main__start__button">
            시작하기
          </button>
        </Link>
        <div className="findme__main__start__disclaimer">
          * 본  무료테스트는 옥타그노시스 검사의 축약본으로<br />
          옥타그노시스 온라인검사에서 나타나는 성향들 중에서<br />
          일부 성향만 보여질 수 있습니다.
        </div>
      </div>
      <FooterPage/>
    </>
  )
}

export default StartPage;