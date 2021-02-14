import React from 'react';
import img_character2 from '../../img/img_character2.png'
const Proceeding = ({ loading }) => {
  
  if (loading) {
    return (
      <div class="loading-wrap">
        <div class="inner">
          <div class="loading">
            <div class="bar"></div>
            <img src={img_character2} alt="" />
          </div>
          <p class="txt">10만명의 데이터들 중에서 <br />당신의 데이터를 추출중입니다!</p>
        </div>
      </div>
    )
  }
  return null;
}
export default Proceeding;