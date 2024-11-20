import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router";
import {Form} from 'react-bootstrap'
import FooterPage from './common/FooterPage';
import '../css/information.css'
import "../css/terms.css";
import HeaderPage from './common/HeaderPage';
import TermsList from "../components/terms/TermsList";
import {fetchTermsList} from "../api/termsAPI";

const PUBLIC_URL = process.env.PUBLIC_URL;

const privacyData = [
  {
    title: "이름",
    type: "text",
    name: "userName",
  },
  {
    title: "생년월일",
    type: "date",
    name: "userBirth",
  },
  {
    title: "휴대폰",
    type: "text",
    name: "userMobile",
  },
  {
    title: "이메일",
    type: "text",
    name: "userEmail",
  },
];


const UserPrivacyTermsPage = ({history, match}) => {

  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({});
  const [termsList, setTermsList] = useState([]);

  const onChange = (e) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    console.log("submit")
    const form = e.currentTarget;
    e.preventDefault();
    if (!form.checkValidity()) {
      console.log("no validated");
      e.stopPropagation();
      setValidated(true);
    } else {
      history.replace({pathname: '/pages/1', state: {userInfo: inputs, answerState: {}}});
    }
  };

  useEffect(() => {
    fetchTermsList()
      .then(({data}) => {
        setTermsList(data);
      });
  }, []);

  return (
    <>
      <HeaderPage/>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="information_form">
        <TermsList termsList={termsList}/>
        <div className="findme__info__select">
          {privacyData.map(({name, type, title}, index) => (
            <Form.Group key={index}>
              <div className="findme__info__select__label">
                {title}
              </div>
              <div>
              </div>
              <div className="findme__info__select__option">
                <label className="findme__info__select__option__element" htmlFor="o1_m" style={{width: '100%', maxWidth: "100%"}}>
                  <Form.Control type="text" id="o1_m" name={name} value={inputs[name]} onChange={onChange} required/>
                  <div className="findme__info__select__option__button big" style={{height: 50}}>
                    <input type={type} style={{display: "block", width: "100%", height: "50%", border: "none", outline: "none", fontSize: 15, padding: 20}} name={name} onChange={onChange} required/>
                  </div>
                  <Form.Control.Feedback type="invalid">{title}을 입력해 주세요</Form.Control.Feedback>
                </label>
              </div>
            </Form.Group>
          ))}

        </div>

        {JSON.stringify(inputs)}
        <div className="findme__common__next">
          <button type="submit" className="findme__common__next__button">
            NEXT
            <img className="findme__common__next__button--image" src={PUBLIC_URL + '/images/icons/next.svg'} alt="next"/>
          </button>
        </div>
      </Form>
      <FooterPage/>
    </>
  )
}

export default UserPrivacyTermsPage;