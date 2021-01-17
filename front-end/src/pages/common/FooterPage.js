import React from 'react';

const FooterPage = () => {
  const PUBLIC_URL = process.env.PUBLIC_URL;
  return (
    <div className="findme__main__logo__wrapper">
      <img src={PUBLIC_URL + '/images/logo.svg'} alt="Korea career aptitude center" />
    </div>
  )
}

export default FooterPage;