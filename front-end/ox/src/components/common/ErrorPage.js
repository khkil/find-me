import React, { useEffect } from 'react';

const ErrorPage = () => {
  useEffect(() => {

    
  })
  return (
    <div class="exam-wrap">
      
      <div class="exam-head"></div>
      <div className="board" style={{minHeight: '500px'}}>
        <div class="board-frame01"></div>
        <div class="board-frame02"></div>
        <div class="board-frame03"></div>
        <div class="board-frame04"></div>
        <p class="txt-guide">
          <strong style={{fontSize: '40px'}}>404</strong><br/>
          <strong style={{fontSize: '40px'}}>페이지를 찾을수 없습니다</strong>
        </p>
        <br/>
        <br/>
        <div>
          <button class="btn md blue-gra" style={{margin: '30px auto 0'}} onClick={() => { window.location.href = '/' } }>홈으로 가기</button>
        </div>
       
      </div>
    </div> 
  )
}

export default ErrorPage;