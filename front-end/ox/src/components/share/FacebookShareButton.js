import React from 'react';

const FacebookShareButton = ({ shareUrl }) => {
  const onClick = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0, left=0',width=560,height=550");
  }
  return (
    <>
      <button class="btn sm white crl-blue" onClick={onClick}>
        <i>
          <img src={process.env.PUBLIC_URL + "/images/btn_ico_facebook.png"} alt="" />
        </i>페이스북 공유
      </button>

    </>
  )

}

export default FacebookShareButton;