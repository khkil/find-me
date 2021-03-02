import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthInfo } from '../../modules/auth';

const Header = ({ cookies, removeCookie }) => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    if(cookies.user){
      const { user } = cookies;
      console.log(user);
      dispatch(getAuthInfo({ 'token' : user }));
    }
  }, [ cookies ])
  const logout = () => {
    removeCookie('user', {path:'/'});
  }
  const { data } = useSelector(state => state.auth);
  if(!data || !cookies.user) return null;
  const { user_name } = data;
  return (
    <>
      <div id="header_content">
        {user_name}님 환영합니다.

        <button onClick={logout}>로그아웃</button>
        <h2>
          header
        </h2>
      </div> 
    </>
  )
}

export default Header;