import React from 'react';

const FacebookShareButton = () => {
  const instagramShareUrl = 'https://www.instagram.com/octa_gnosis/';

  const onClick = () => {
    window.open(instagramShareUrl);
  }
  
  return (
    <button className="findme__result__share__buttons--link" onClick={onClick}>
      <img src={process.env.PUBLIC_URL + "/images/icons/instagram.png"} alt='facebook_share_image' />
    </button>
  )
}

export default FacebookShareButton;