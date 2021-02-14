import React from 'react';

const NaverBlogShareButton = ({ shareUrl }) => {
  const onClick = () => {
    const url = shareUrl;
    const title = encodeURI("나를 찾으소");
    const shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
    window.open(shareURL, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0, left=0',width=560,height=550");
  }

  return (
    <>
      <button class="btn sm white crl-litegreen" onClick={onClick}>
        <i>
          <img src={process.env.PUBLIC_URL + "/images/btn_ico_blog.png"} alt="" />
        </i>
        네이버블로그 공유
      </button>

    </>
  )

}

export default NaverBlogShareButton;