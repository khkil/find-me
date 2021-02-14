import React from 'react';

const Result = ({ result }) => {

  const makeStringArr = (str) => {
    const tag = '<br/>';
    if(!str) return [];
    return str.split(tag);
  }
  const { result_idx, result_name, result_title, main_sentence, sub_sentence, good_keyword, bad_keyword } = result;

  return (
    <>
      <div className="findme__result">

        <div className="findme__result__title">
          <strong dangerouslySetInnerHTML={{ __html: result_title }} /><br />
          <span className="findme__result__title--highlight">{result_name}</span>
        </div>
        <div className="findme__result__illustration">
          <img
            src={process.env.PUBLIC_URL + `/images/illustration/result-img-${result_idx}.png`}
            alt="result illustration"
            className="findme__result__illustration__image" />
          <div className="findme__result__illustration__explanation">
            <span dangerouslySetInnerHTML={{ __html: main_sentence }} />
          </div>
        </div>
        <div className="findme__result__detail">
          {makeStringArr(sub_sentence).map((str, index) => {
            return (
              <div className="findme__result__detail__element" key={index}>
                {str}
              </div>
            )
          })}
        </div>

        <div className="findme__result__pros-cons">
          <div className="findme__result__pros-cons__label">
            {result_name}의 강점 키워드
                  </div>
          {makeStringArr(good_keyword).map((str, index) => {
            return (
              <div className="findme__result__pros-cons__element" key={index}>
                #{str}
              </div>
            )
          })}
        </div>
        <div className="findme__result__pros-cons">
          <div className="findme__result__pros-cons__label">
          {result_name}의 약점 키워드
                  </div>
          {makeStringArr(bad_keyword).map((str, index) => {
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