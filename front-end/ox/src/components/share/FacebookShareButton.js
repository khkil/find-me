import React from 'react';

const FacebookShareButton = ({ shareUrl }) => {
  const onClick = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0, left=0',width=560,height=550");
  }
  return (
    <>
      <button className="findme__result__share__buttons--link" onClick={onClick}>
        <img src={process.env.PUBLIC_URL + "/images/icons/facebook.png"} alt='facebook_share_image' />
      </button>

    </>
  )

}

export default FacebookShareButton;