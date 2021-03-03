import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthInfo } from '../../modules/auth';

const Header = ({ cookies, removeCookie, test }) => {

  const dispatch = useDispatch();

  const logout = () => {
    removeCookie('user', { path: '/' });
  }

  useEffect(() => {
    const { user } = cookies;
    dispatch(getAuthInfo({ 'token': user }));
  }, [cookies]);

  const { data } = useSelector(state => state.auth);
  if (!data || !cookies.user) return null;
  const { member_name } = data;
  return (
    <>
      <div id="header_content">
        {member_name} 님 환영합니다.
        <button onClick={logout}>로그아웃</button>
        <h2>
          header
        </h2>
      </div>

    </>
  )

}

export default Header;