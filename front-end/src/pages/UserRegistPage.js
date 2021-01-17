import React, { useState } from 'react';
import { useLocation } from "react-router";
import { Form } from 'react-bootstrap'
import FooterPage from './common/FooterPage';
import '../css/information.css'

const PUBLIC_URL = process.env.PUBLIC_URL;
const UserRegistPage = ({ history, match }) => {
  
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({});

  const ageGroup = [
    { down: 0, top: 18, text: '18세 이하' },
    { down: 19, top: 25, text: '19~25세' },
    { down: 26, top: 50, text: '26~50세' },
    { down: 50, top: 100, text: '50세 이상' }
  ]

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const handleSubmit = (e) => {

    const form = e.currentTarget;
    e.preventDefault();
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
    } else {
      history.push({ pathname: '/pages/1', state: { userInfo: inputs, answerState: {} } });
    }
  };


  return (
    
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="information_form">
        <div className="findme__info__select">
        <Form.Group>
          <div className="findme__info__select__label">
            성별
          </div>
            <div className="findme__info__select__option">
              <label className="findme__info__select__option__element" htmlFor="o1_m">
                <Form.Control type="radio" id="o1_m" name="user_gender" value="male" onChange={onChange} required />
                <div className="findme__info__select__option__button big">
                  남자
                </div>
                <Form.Control.Feedback type="invalid">성별을 선택해주세요</Form.Control.Feedback>

              </label>
              <label className="findme__info__select__option__element" htmlFor="o1_w">
                <Form.Control type="radio" id="o1_w" name="user_gender" value="female" onChange={onChange} required />
                <div className="findme__info__select__option__button big">
                  여자
                </div>
              </label>
            </div>
          </Form.Group>
          <Form.Group>
            <div className="findme__info__select__label">
              나이
            </div>
            <div className="findme__info__select__option">
              {ageGroup.map(({ text }, index) => {
                return (
                  <label className="findme__info__select__option__element" htmlFor={`age_${index}`} key={index}>
                    <Form.Control type="radio" id={`age_${index}`} name="user_age" value={`group_${index + 1}`} onChange={onChange} required />
                    <div className="findme__info__select__option__button">
                      {text}
                    </div>
                    {index === 2 &&  <Form.Control.Feedback type="invalid">나이를 선택해주세요</Form.Control.Feedback>}
                  </label>
                )
              })}
            </div>
          </Form.Group>
        </div>
        <div className="findme__common__next">
          <button type="submit" className="findme__common__next__button">
            NEXT
            <img className="findme__common__next__button--image" src={PUBLIC_URL + '/images/icons/next.svg'} alt="next" />
          </button>
        </div>
      </Form>
      <FooterPage/>
    </>
  )
}

export default UserRegistPage;