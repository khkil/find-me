import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, reset } from '../modules/counter';

function CounterContainer() {
  const number = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    console.log(increase());
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };
  const onReset = () => {
    dispatch(reset());
  };

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} onReset={onReset} />
  );
}

export default CounterContainer;