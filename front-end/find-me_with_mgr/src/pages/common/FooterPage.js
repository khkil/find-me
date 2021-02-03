import React from 'react';

const FooterPage = () => {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  return (
    <div className="findme__main__logo__wrapper">
      <img src={PUBLIC_URL + '/images/logo.svg'} alt="Korea career aptitude center" />
      <div className="findme__common__footer__call">
        ☎ 02.523.7523
      </div>
    </div>
  )
}

export default FooterPage;