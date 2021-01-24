import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInspection } from '../../modules/inspection';

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
  return (
    <div className="findme__common__container">
      <div className="findme__common__wrapper">
        {children}
      </div>
    </div>
  )
}

export default AppPage;