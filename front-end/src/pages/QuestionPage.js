import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getQuestions } from '../modules/question'


const QuestionPage = () => {

  const { data, loading, error } = useSelector(state => state.question);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestions(1));
  }, [dispatch]);
  return (
    <>
      <h2>{JSON.stringify(data)}</h2>
    </>
  )
}

export default QuestionPage; 