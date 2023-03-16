import React from "react";

const ResultContentPopup = ({ showMap, setShowMap }) => {
  const { popup, content } = showMap;
  const closePopup = () => {
    setShowMap({
      ...showMap,
      popup: false,
      content: -1,
    });
  };
  return (
    popup && (
      <div id="root">
        <div class="findme__result__other__detail">
          <button
            class="findme__result__other__detail__close"
            style={{
              background: `url(${process.env.PUBLIC_URL}/template/images/icons/close.png) no-repeat center`,
            }}
            onClick={closePopup}
          ></button>
          <div class="swiper findme__result__other__detail__swiper">
            <div class="swiper-wrapper">
              {content === 0 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 1 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 2 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 3 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 4 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 5 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 6 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 7 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 8 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 9 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 10 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 11 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 12 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 13 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
              {content === 14 && (
                <div class="swiper-slide">
                  <div
                    class="findme__result__other__detail__head"
                    style={{ backgroundColor: "#33b8e8" }}
                  >
                    <div class="findme__result__other__detail__num">01</div>
                    <div class="findme__result__other__detail__cont">
                      <div class="findme__result__other__detail__title">
                        관찰형
                      </div>
                      <div class="findme__result__other__detail__subtitle">
                        눈으로 직접 확인하고 경험한 결과만 신뢰
                      </div>
                    </div>
                  </div>
                  <div class="findme__result__other__detail__body">
                    <div class="findme__result__other__detail__img">
                      <img
                        src="./images/illustration/result-img-01.png"
                        alt=""
                      />
                    </div>
                    <div class="findme__result__other__detail__text">
                      당신은 눈에 보이는 자연, 환경, 우주에 관심이 많으며,
                      자신의 관심분야에 집중합니다. <br />
                      관찰형 특유의 말과 행동이 느린 당신, 주변에서 느리다는
                      말을 많이 듣지만 묵묵하게 목표를 향해 갑니다. 당신은
                      스피드를 원하는 일보다는 시간이 걸리더라도 완성도 높은
                      일이 잘 맞습니다. <br />
                      속내를 잘 드러내지 않는 당신은 관심사가 같거나 공유할 수
                      있는 사람과만 친하게 지내는 편이라 사회성이 부족하다는
                      말을 듣기도 합니다. <br />
                      단기적인 성과보다는 오랜 실험이나 관찰을 필요로 하는
                      장기적인 성과를 내는 자연, 기상, 우주, 지구, 환경 관련
                      연구업무에 유리합니다.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div class="dim"></div>
      </div>
    )
  );
};

export default ResultContentPopup;
