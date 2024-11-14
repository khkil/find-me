import React, {useState} from 'react';
import {useLocation} from "react-router";
import {Form} from 'react-bootstrap'
import FooterPage from './common/FooterPage';
import '../css/information.css'
import HeaderPage from './common/HeaderPage';

const PUBLIC_URL = process.env.PUBLIC_URL;
const UserRegistPage = ({history, match}) => {

  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({});

  const onChange = (e) => {
    const {name, value} = e.target;
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
      history.replace({pathname: '/pages/1', state: {userInfo: inputs, answerState: {}}});
    }
  };

  const privacyData = [
    {
      title: "이름",
      name: "userName",
    },
    {
      title: "생년월일",
      name: "userBirth",
    },
    {
      title: "휴대폰",
      name: "userMobile",
    },
    {
      title: "이메일",
      name: "userEmail",
    },
  ];

  return (

    <>
      <HeaderPage/>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="information_form">
        <div className="findme__info__select">
          {privacyData.map(({name, title}, index) => (
            <Form.Group key={index}>
              <div className="findme__info__select__label">
                {title}
              </div>
              <div>
              </div>
              <div className="findme__info__select__option">
                <label className="findme__info__select__option__element" htmlFor="o1_m" style={{width: '100%', maxWidth: "100%"}}>
                  <Form.Control type="text" id="o1_m" name="user_gender" value="male" onChange={onChange} required/>
                  <div className="findme__info__select__option__button big">
                    <input type={"text"} style={{display: "block", width: "100%", height: "80%", border: "none", outline: "none", fontSize: "20px", padding: 20}} onChange={onChange} required/>
                  </div>

                </label>

              </div>
            </Form.Group>
          ))}

        </div>
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

export default UserRegistPage;