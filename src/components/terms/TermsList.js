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
                <p className="article_text" style={{whiteSpace: "pre-line"}}>
                  {termsContent}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Form.Group>
  )
}

export default TermsList;