import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthInfo } from '../../modules/auth';

const Header = ({ showSideTags, cookies, removeCookie }) => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    if(cookies.user){
      console.log(1);
      const { user } = cookies;
      console.log(user);
      dispatch(getAuthInfo({ 'token': user }));
    }
  }, [])
  const logout = () => {
    removeCookie('user', {path:'/'});
  }
  const { data } = useSelector(state => state.auth);
  if(!data) return null;
  const { user_name } = data;
  return (
    <>
      {(showSideTags) && 
        <div>
          {user_name}님 환영합니다.

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