import React, { useMemo } from "react";

const ResultContentPopup = ({
  contents,
  selectedContent,
  setSelectedContent,
}) => {
  const closePopup = () => {
    setSelectedContent(-1);
  };

  const moveNext = () => {
    setSelectedContent(selectedContent + 1);
  };

  const movePrev = () => {
    setSelectedContent(selectedContent - 1);
  };

  const contentDetail = useMemo(
    () => contents[selectedContent].detail,
    [selectedContent]
  );

  return (
    <div id="root">
      <div
        className="findme__result__other__detail"
        style={{ whiteSpace: "pre-line" }}
      >
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
              <div
                className="findme__result__other__detail__head"
                style={{ background: contentDetail.background }}
              >
                <div className="findme__result__other__detail__num">{`${
                  selectedContent < 9 ? 0 : ""
                }${selectedContent + 1}`}</div>
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
                    src={`${
                      process.env.PUBLIC_URL
                    }/template/images/illustration/result-img-${
                      selectedContent < 9 ? 0 : ""
                    }${selectedContent + 1}.png`}
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
        {selectedContent > 0 && (
          <div className="swiper-button-prev" onClick={movePrev}>
            <img
              src={`${process.env.PUBLIC_URL}/template/images/icons/swiper_left.png`}
              alt=""
            />
          </div>
        )}

        {selectedContent < contents.length - 1 && (
          <div className="swiper-button-next" onClick={moveNext}>
            <img
              src={`${process.env.PUBLIC_URL}/template/images/icons/swiper_right.png`}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="dim"></div>
    </div>
  );
};

export default ResultContentPopup;
