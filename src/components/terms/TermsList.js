import React from "react";

const TermsList = ({termsList}) => {

  return (
    <ul className="terms_list">
      {termsList.map(({termsIdx, termsName, termsContent, required}) => (
        <li className="terms_item" key={termsIdx}>
          <div className="check_terms">
            <div className="check_wrap">
              <input type="checkbox" id={`termsService_${termsIdx}`} className="blind"/>
              <label htmlFor={`termsService_${termsIdx}`}>
                <em className="option point">[{required ? "필수" : "선택"}]</em>
                <div className="text_wrap">
                  <span className="text">{termsName}</span>
                </div>
              </label>
            </div>
          </div>
          <div className="terms_box" tabIndex="0">
            <div className="article">
              <p className="article_text">
                {termsContent}
              </p>
              {/* <p className="article_text">
                네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을
                확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.
              </p>*/}
            </div>
          </div>
        </li>
      ))}

    </ul>
  )
}

export default TermsList;