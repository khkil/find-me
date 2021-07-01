import React from 'react';

const Result = ({ result }) => {

  console.log(result);
  const makeStringArr = (str) => {
    const tag = '<br/>';
    if(!str) return [];
    return str.split(tag);
  }
  const { resultIdx, resultName, resultTitle, mainSentence, subSentence, goodKeyword, badKeyword } = result;

  return (
    <>
      <div className="findme__result">

        <div className="findme__result__title">
          <strong dangerouslySetInnerHTML={{ __html: resultTitle }} /><br />
          <span className="findme__result__title--highlight">{resultName}</span>
        </div>
        <div className="findme__result__illustration">
          <img
            src={process.env.PUBLIC_URL + `/images/illustration/result-img-${resultIdx}.png`}
            alt="result illustration"
            className="findme__result__illustration__image" />
          <div className="findme__result__illustration__explanation">
            <span dangerouslySetInnerHTML={{ __html: mainSentence }} />
          </div>
        </div>
        <div className="findme__result__detail">
          {makeStringArr(subSentence).map((str, index) => {
            return (
              <div className="findme__result__detail__element" key={index}>
                {str}
              </div>
            )
          })}
        </div>

        <div className="findme__result__pros-cons">
          <div className="findme__result__pros-cons__label">
            {resultName}의 강점 키워드
                  </div>
          {makeStringArr(goodKeyword).map((str, index) => {
            return (
              <div className="findme__result__pros-cons__element" key={index}>
                #{str}
              </div>
            )
          })}
        </div>
        <div className="findme__result__pros-cons">
          <div className="findme__result__pros-cons__label">
          {resultName}의 약점 키워드
                  </div>
          {makeStringArr(badKeyword).map((str, index) => {
            return (
              <div className="findme__result__pros-cons__element" key={index}>
                #{str}
              </div>
            )
          })}
        </div>
      </div>
      <br/>
    </>
  )
}

export default Result;