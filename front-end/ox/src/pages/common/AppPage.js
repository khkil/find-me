import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInspection } from '../../modules/inspection';
import { Helmet } from "react-helmet"
import FooterPage from './FooterPage';
import HeaderPage from './HeaderPage';

const AppPage = ({ children }) => {

  const dispatch = useDispatch();
  const { host } = window.location;
  useEffect(() => {
    dispatch(getInspection(host));
  }, [host]);
  const { data, loading, error } = useSelector(state => state.inspection);

  if (loading || !data) return null
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  const { inspection_name } = data;
  return (
    <>
      <HeaderPage/>
      <div class="contents">
        <div class="container">
          <h1 class="logo">
            <a>한국진로적성센터</a>
          </h1>
          {children}
        </div>
      </div>
      <FooterPage/>
    </>
  )
}

export default AppPage;