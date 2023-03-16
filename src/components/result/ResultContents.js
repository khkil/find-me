import React, { useState } from "react";
import ResultContentPopup from "./ResultContentPopup";

const ResultContents = () => {
  const [showMap, setShowMap] = useState({
    popup: false,
    content: -1,
  });

  const showContent = (content) => {
    setShowMap({
      ...showMap,
      popup: true,
      content: content,
    });
  };
  return (
    <div id="root">
      <div className="findme__common__container">
        <div className="findme__common__wrapper">
          <div className="findme__result__other">
            <p className="findme__result__other__label">
              옥타그노시스 <br />
              15가지 성형 알아보기
            </p>
            <div className="findme__result__other__tendency">
              <dl onClick={() => showContent(0)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-01.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">관찰형</div>
                  <div className="txt">
                    눈으로 직접 확인하고 <br />
                    경험한 결과만 신뢰
                  </div>
                </dd>
              </dl>
              <dl onClick={() => showContent(1)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-02.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">교육형</div>
                  <div className="txt">
                    가르치면서 행복을 느끼는 <br />
                    진정한 멘토
                  </div>
                </dd>
              </dl>
              <dl onClick={() => showContent(2)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-03.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">규범형</div>
                  <div className="txt">
                    법 없어도 살 사람? <br />
                    법이 있어야 사는 사람
                  </div>
                </dd>
              </dl>
              <dl onClick={() => showContent(3)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-04.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">복합형</div>
                  <div className="txt">전천후 멀티플레이어</div>
                </dd>
              </dl>
              <dl onClick={() => showContent(4)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-05.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">봉사형</div>
                  <div className="txt">
                    투명 날개 달고 있나요? <br />
                    천사 같은 사람
                  </div>
                </dd>
              </dl>
              <dl onClick={() => showContent(5)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-06.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">분석형</div>
                  <div className="txt">빈틈없는 완벽주의자</div>
                </dd>
              </dl>
              <dl onClick={() => showContent(6)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-07.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">생명형</div>
                  <div className="txt">생명을 향한 무한 애정</div>
                </dd>
              </dl>
              <dl onClick={() => showContent(7)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-08.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">소통형</div>
                  <div className="txt">5분만에 친구만들기</div>
                </dd>
              </dl>
              <dl onClick={() => showContent(8)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-09.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">실용형</div>
                  <div className="txt">
                    돈이 되느냐? 돈이 안 되느냐? <br />
                    그것이 문제로다
                  </div>
                </dd>
              </dl>
              <dl onClick={() => showContent(9)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-10.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">운동형</div>
                  <div className="txt">대담한 활동력, 넘치는 에너지</div>
                </dd>
              </dl>
              <dl onClick={() => showContent(10)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-11.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">원리형</div>
                  <div className="txt">타고난 학자 스타일</div>
                </dd>
              </dl>
              <dl onClick={() => showContent(11)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-12.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">제작형</div>
                  <div className="txt">
                    뭐든 척척 만들어내는 <br />
                    손재주의 달인
                  </div>
                </dd>
              </dl>
              <dl onClick={() => showContent(12)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-13.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">진취형</div>
                  <div className="txt">타고난 리더</div>
                </dd>
              </dl>
              <dl onClick={() => showContent(13)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-14.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">창조형</div>
                  <div className="txt">
                    무에서 유를 창조하는 <br />
                    아이디어 뱅크
                  </div>
                </dd>
              </dl>
              <dl onClick={() => showContent(14)}>
                <dt>
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-15.png`}
                    alt=""
                  />
                </dt>
                <dd>
                  <div className="tit">추리형</div>
                  <div className="txt">
                    한 가지 단서만으로도 <br />
                    다음 상황을 예측
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <ResultContentPopup showMap={showMap} setShowMap={setShowMap} />
    </div>
  );
};

export default ResultContents;
