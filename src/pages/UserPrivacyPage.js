import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router";
import {Form} from 'react-bootstrap'
import FooterPage from './common/FooterPage';
import '../css/information.css'
import "../css/terms.css";
import HeaderPage from './common/HeaderPage';
import TermsList from "../components/terms/TermsList";
import {fetchTermsList} from "../api/termsAPI";
import {insertUserPrivacy} from "../api/userAPI";
import Proceeding from "../components/common/Proceeding";

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
    name: "userPhone",
  },
  {
    title: "이메일",
    type: "text",
    name: "userEmail",
  },
];


const UserPrivacyTermsPage = ({history, match}) => {

  const {state: {userInfo, answerState}} = useLocation();
  const [validated, setValidated] = useState(false);
  const [inputs, setInputs] = useState({});
  const [termsList, setTermsList] = useState([]);
  const [proceeding, setProceeding] = useState(false);

  const onChange = (e) => {
    const {name, type, value, checked} = e.target;
    if (type === 'checkbox') {
      const termsIdx = value;
      const isAgreed = Boolean(checked);
      const agreement = {termsIdx, isAgreed}

      setInputs({...inputs, termsAgreements: inputs.termsAgreements.map(v => v.termsIdx == termsIdx ? agreement : v)})
    } else {
      setInputs({
        ...inputs,
        [name]: value
      });
    }
  }

  const checkPrivacyTerms = () => {
    try {
      termsList.forEach(({termsIdx, isRequired}) => {
        if (isRequired) {
          const {isAgreed} = inputs.termsAgreements.find(v => v.termsIdx == termsIdx);
          if (!isAgreed) {
            throw new Error("not agreed");
          }
        }
      });
      return true;

    } catch (error) {
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkPrivacyTerms()) {
      alert("필수 약관에 체크해주세요.");
      return;
    }

    const userIdx = userInfo?.userIdx;
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      console.log("no validated");
      e.stopPropagation();
      setValidated(true);
    } else {


      setProceeding(true);
      setTimeout(async () => {
        const {status} = await insertUserPrivacy(userIdx, inputs);
        console.log(status)
        if (status === 'success') {
          history.replace({
            pathname: ('/pages/result'),
            state: {userInfo, answerState}
          });
        }
      }, 3000);
    }
  };

  useEffect(() => {
    fetchTermsList()
      .then(({data}) => {
        setTermsList(data);
        setInputs({termsAgreements: data.map(v => ({termsIdx: v.termsIdx, isAgreed: false}))});
      });
  }, []);

  if (proceeding) return <Proceeding loading={proceeding}/>;
  return (
    <>
      <HeaderPage/>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="information_form">
        <TermsList termsList={termsList} onChange={onChange}/>
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
                  <Form.Control type="text" name={name} value={inputs[name]} onChange={onChange} required/>
                  <div className="findme__info__select__option__button big" style={{height: 50}}>
                    <input type={type} style={{display: "block", width: "100%", height: "50%", border: "none", outline: "none", fontSize: 15, padding: 20}} name={name} onChange={onChange} required/>
                  </div>
                  <Form.Control.Feedback type="invalid">{title}을 입력해 주세요</Form.Control.Feedback>
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

export default UserPrivacyTermsPage;