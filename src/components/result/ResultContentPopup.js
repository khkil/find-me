import React, { useMemo } from "react";

const ResultContentPopup = ({ contentDetail, setSelectedContent, lastIndex }) => {
  const closePopup = () => {
    setSelectedContent(null);
  };

  const moveNext = () => {

  }

  const movePrev = () => {

  }

  return (
    <div id="root">
      <div className="findme__result__other__detail">
        <button
          className="findme__result__other__detail__close"
          style={{
            background: `url(${process.env.PUBLIC_URL}/template/images/icons/close.png) no-repeat center`,
          }}
          onClick={closePopup}
        ></button>
        <div className="swiper findme__result__other__detail__swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="findme__result__other__detail__head" style={{ background: contentDetail.background }}>
                <div className="findme__result__other__detail__num">{`${contentDetail.index < 9 ? 0 : ''}${contentDetail.index + 1}`}</div>
                <div className="findme__result__other__detail__cont">
                  <div className="findme__result__other__detail__title">
                    {contentDetail.title}
                  </div>
                  <div className="findme__result__other__detail__subtitle">
                  {contentDetail.subTitle}
                  </div>
                </div>
              </div>
              <div className="findme__result__other__detail__body">
                <div className="findme__result__other__detail__img">
                  <img
                    src={`${process.env.PUBLIC_URL}/template/images/illustration/result-img-01.png`}
                    alt=""
                  />
                </div>
                <div className="findme__result__other__detail__text">
                  {contentDetail.desc.replaceAll("<br>", "\n")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dim"></div>
    </div>
  )
};

export default ResultContentPopup;
