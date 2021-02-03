import React from 'react';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'react-bootstrap'

const ToolbarPage = ({ match }) => {
  const { data } = useSelector(state => state.inspection);
  const { page } = match.params;
  const { totalPages } = data;

  const progress = parseInt(page / totalPages * 100);
  return (
    
    <div className="findme__common__toolbar">
      <ProgressBar animated now={progress} />
      {/* <button className="findme__common__toolbar__previous-button">
        <img
          alt="previous menu"
          className="findme__common__toolbar__previous-button__image"
          src={process.env.PUBLIC_URL + '/images/icons/before.svg'} />
      </button>
      <div className="findme__common__toolbar__current-page">
        나를 찾아줘 테스트
          <span className="findme__common__toolbar__current-page__number">n/16</span>
      </div> */}
    </div>

  )
}

export default ToolbarPage;