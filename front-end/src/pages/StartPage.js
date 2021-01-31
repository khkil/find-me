import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserCount } from '../modules/user';
import FooterPage from './common/FooterPage';
import HeaderPage from './common/HeaderPage';
import '../css/index.css'

const StartPage = () => {

  const PUBLIC_URL = process.env.PUBLIC_URL;
  const dispatch = useDispatch();
  const inspection = useSelector(state => state.inspection);

  const { data, loading, error } = useSelector(state => state.user);
  

  useEffect(() => {
    const inspectionIdx = inspection.data.inspection_idx;
    dispatch(getUserCount(inspectionIdx));
  },[])

  if (loading || !data) return null;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  
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
        <div className="findme__main__illustration__text--ask">
        <img className="findme__main__illustration--icon" alt="mic icon" src={PUBLIC_URL + '/images/icons/mic.svg'}/>
          옥스, 나를 찾아줘
        </div>
          <img
            className="findme__main__illustration--image"
            alt="main illustration"
            src={PUBLIC_URL + '/images/illustration/main.png'} />
            <div className="findme__main__illustration__text--answer">
              “네, 당신을 찾아드릴게요. 검사를 시작하세요.”
            </div>
        </div>
        <div className="findme__main__start">
          <Link to={{ pathname: "/pages/user" }}>
            <button className="findme__main__start__button">
              시작하기<br/>
              <span className="findme__main__start__button__count">
                현재 총 {data}명이 참여했어요.
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