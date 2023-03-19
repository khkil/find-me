import React, { useEffect } from "react";

const KakaoShareButton = ({ shareUrl }) => {
  useEffect(() => {
    createKakaoButton();
  }, []);
  const createKakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("f08187227e9f06bc2c882ab7c6228a8a");
      }
      kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "나를 찾아줘",
          description: "#옥타그노시스  #Human-x",
          imageUrl: "http://www.humannx.com/images/logo-octagnosis_og.png",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        /* social: {
          likeCount: 77,
          commentCount: 55,
          sharedCount: 333,
        }, */
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    }
  };
  return (
    <>
      <button
        id="kakao-link-btn"
        className="findme__result__share__buttons--kakao"
        onClick={() => {
          alert(process.env.REACT_APP_KAKAO_KEY);
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/images/icons/kakao.png"}
          alt="kakao_share_image"
        />
      </button>
    </>
  );
};
export default KakaoShareButton;
