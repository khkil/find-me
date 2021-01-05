import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../modules/counter';

const CounterContainer = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increment());
  };

  const onDecrease = () => {
    dispatch(decrement());
  };

  return (
    <Counter number={counter} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;