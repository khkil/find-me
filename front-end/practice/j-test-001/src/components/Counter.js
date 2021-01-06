import React from 'react';

const Counter = ({ onIncrease, onDecrease, onMultiple, onDivision, number }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
        <button onClick={onMultiple}>*2</button>
        <button onClick={onDivision}>/2</button>
      </div>
    </div>
  );
};

export default Counter;