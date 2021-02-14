import React from 'react';

const Result = ({ result }) => {

  const makeStringArr = (str) => {
    const tag = '<br/>';
    if (!str) return [];
    return str.split(tag);
  }
  const { result_idx, result_title, main_sentence, sub_sentence, good_keyword, bad_keyword, good_result, bad_result } = result;

  return (
    <>
      <div class="user-result">
        <div class="img-wrap">
          <img src={process.env.PUBLIC_URL + `/images/results/result_${result_idx}.png`} alt="" />
        </div>
        <div class="txt-wrap">
          <p class="tit">당신은 {main_sentence} <strong> ‘{result_title}’ </strong></p>
          <ul>
            {makeStringArr(sub_sentence).map((value, index) => {
              return (
                <li key={index}>{value}</li>
              )
            })}
          </ul>
        </div>
      </div>
      <div class="relation-result">
        <div class="good-type">
          <div class="inner">
            <p class="txt-type">안맞소</p>
            {good_result != null &&
              <>
                <p class="txt-ex">{good_keyword} <strong>‘{good_result.result_title}’</strong></p>
                <div class="img-wrap">
                  <img src={process.env.PUBLIC_URL + `/images/results/result_${good_result.result_idx}.png`} alt="" />
                </div>
              </>
            }
          </div>
        </div>
        <div class="bad-type">
          <div class="inner">
            <p class="txt-type">안맞소</p>
            {bad_result != null ?
              <>
                <p class="txt-ex">{bad_keyword} <strong>‘{bad_result.result_title}’</strong></p>
                <div class="img-wrap">
                  <img src={process.env.PUBLIC_URL + `/images/results/result_${bad_result.result_idx}.png`} alt="" />
                </div>
              </>
              :
              result_idx === 23 ?
              <>
                <p class="txt-ex">{bad_keyword}</p>
                
              </>
              :

              null

            }
          </div>
        </div>

      </div>

    </>
  )
}

export default Result;