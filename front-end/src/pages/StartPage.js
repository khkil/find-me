import React from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css'
import FooterPage from './common/FooterPage';
import HeaderPage from './common/HeaderPage';

const StartPage = () => {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  return (

    <>
      <HeaderPage/>
        <div className="findme__main__title">
          나는 어떤 사람일까?
        </div>
        <div className="findme__main__subtitle">
          나 조차도 잘 몰랐던 나,<br/>
          내가 어떤 사람인지 알고싶다면?
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
              시작하기<br/>
              <span class="findme__main__start__button__count">
                현재 총 0명이 참여했어요.
              </span>
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