import React from "react";
import {Form} from "react-bootstrap";

const TermsList = ({termsList, onChange}) => {

  return (
    <Form.Group>
      <ul className="terms_list">
        {termsList?.map(({termsIdx, termsName, termsContent, isRequired}) => (
          <li className="terms_item" key={termsIdx}>
            <div className="check_terms">
              <div className="check_wrap">
                <Form.Control type="checkbox" id={`termsService_${termsIdx}`} className="blind" value={termsIdx} onChange={onChange}/>
                <label htmlFor={`termsService_${termsIdx}`}>
                  <em className="option point">[{isRequired ? "필수" : "선택"}]</em>
                  <div className="text_wrap">
                    <span className="text">{termsName}</span>
                  </div>
                  <Form.Control.Feedback type="invalid">s을 입력해 주세요</Form.Control.Feedback>
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
    </Form.Group>
  )
}

export default TermsList;