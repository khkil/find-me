import React from 'react';

const HeaderPage = () => {

  return (
    <div className="findme__common__header">
      <img className="findme__common__header__logo--octagnosis" src={process.env.PUBLIC_URL + '/images/logo-octagnosis.png'} alt="Korea career aptitude center"/>
    </div>
  )
}

export default HeaderPage;
