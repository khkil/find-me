import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInspection } from '../../modules/inspection';
import { Helmet } from "react-helmet"

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
      <Helmet
        meta={[
          { property: "og:title", content: inspection_name },
          { property: "og:description", content: "설명" },
          { property: "og:image", content: process.env.PUBLIC_URL + '/images/logo-octagnosis.png' }
        ]}>
        <title>{inspection_name}</title>
        
      </Helmet>
      <div className="findme__common__container">
        <div className="findme__common__wrapper">
          {children}
        </div>
      </div>
    </>
  )
}

export default AppPage;