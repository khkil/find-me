import React, { useEffect } from 'react';

const Header = ({ showSideTags, cookies, removeCookie, hasCookie, setHasCookie }) => {
 
  useEffect(() => {
    if(hasCookie){
      const { user } = cookies;
      console.log(user);
    }
  })
  const logout = () => {
    removeCookie('user', {path:'/'});
    setHasCookie(false);
  }
  return (
    <>
      {showSideTags && 
        <div>
          <button onClick={logout}>로그아웃</button>
          <h2>
            header
          </h2>
        </div>
      }
    </>
  )
}

export default Header;