import React from 'react';

const NaverBlogShareButton = ({ shareUrl }) => {
  const onClick = () => {
    const url = shareUrl;
    const title = encodeURI("나를 찾아줘");
    const shareURL = "https://share.naver.com/web/shareView.nhn?url=" + url + "&title=" + title;
    window.open(shareURL, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0, left=0',width=560,height=550");
  }

  return (
    <>
      <button className="findme__result__share__buttons--link" onClick={onClick}>
        <img src={process.env.PUBLIC_URL + "/images/icons/blog.png"} alt='blog_share_image' />
      </button>

    </>
  )

}

export default NaverBlogShareButton;