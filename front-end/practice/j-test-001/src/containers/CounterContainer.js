import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement, multple, division } from '../modules/counter';

//useSelector : 상태 조회.
const CounterContainer = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increment());
  };

  const onDecrease = () => {
    dispatch(decrement());
  };

  const onMultiple = () => {
    dispatch(multple());
  };

  const onDivision = () => {
    dispatch(division());
  };

  return (
    <Counter number={counter} onIncrease={onIncrease} onDecrease={onDecrease} onMultiple={onMultiple} onDivision={onDivision} />
  );
};

export default CounterContainer;