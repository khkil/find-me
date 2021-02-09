import mascot from '../img/mascot.png'
import logo2 from '../img/logo2.png'

const StartPage = ({ history }) => {

  const start = () => {
    history.replace({ 
      pathname: '/pages/1', 
      state: { userInfo: {}, answerState: {} } 
    });
  }

  return (

    <>
      <div className="main">
        <h2>2021 올해는 소의 해!! <br />
          <strong>나는 어떤 소??</strong>
        </h2>
        <div className="headline">
          <h3>10만 1천 4백명의 삶을 성공으로 바꾼 <br />
            <span>옥</span>타그노시<span>스</span>(옥스<img src={logo2} alt="" />) 검사의 <br />
            <strong>‘나는 어떤 소?’</strong> 버전을 <br />
                지금 시작하세요!
              </h3>
        </div>
        <button className="btn md blue-gra" onClick={start}>
          <i><img src={logo2} alt="" /></i>
                시작
              </button>
        <p>* 본  무료테스트는 옥타그노시스 검사의 축약본으로 <br />옥타그노시스 온라인검사에서 나타나는 성향들 중에서 <br />일부 성향만 보여질 수 있습니다. </p>
        <img src={mascot} alt="" className="mascot" />
      </div>

    </>
  )
}

export default StartPage;