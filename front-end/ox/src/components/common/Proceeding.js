import { Card, Button } from 'react-bootstrap'
import React from 'react';

const Proceeding = ({ loading }) => {
  const style = {
    width: '50%',
    minHeigth: '1000px'
  }
  if (loading) {
    return (
      <div class="exam-wrap" style={style}>
      
      <div class="exam-head"></div>
      <div className="board">
        <div class="board-frame01"></div>
        <div class="board-frame02"></div>
        <div class="board-frame03"></div>
        <div class="board-frame04"></div>
        <p class="txt-guide" style={{padding: '10%'}}>
          <strong>나를 찾으소!</strong><br/>
          당신의 데이터를 분석중입니다
        </p>
     
      </div>
    </div> 
    )
  } 
  return null;
}
export default Proceeding;