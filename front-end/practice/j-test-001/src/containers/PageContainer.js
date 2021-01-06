import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Start from '../components/Start';
import { start } from '../modules/paging';

const PageContainer = () => {
    const text = useSelector(state => state.paging);
    const dispatch = useDispatch();
  
    const onStart = () => {
      dispatch(start());
    };
  
    return (
      <Start text={text} onStart={onStart}  />
    );
  };
  
  export default PageContainer;