import React from 'react';

//text => 변경될 text
//onStart 변경 이벤트
const Start = ({ onStart, text }) => {
    return (       
      <div>
        <h6>{text}</h6>
        <div>
          <button onClick={onStart}>시작하기</button>
        </div>
      </div>
    );
  };
  
  export default Start;