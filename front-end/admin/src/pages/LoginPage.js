import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import * as authApi from '../api/authApi';
import * as defaultCode from '../util/defaultCode';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ cookies, setCookie, history }) => {
  const [inputs, setInputs] = useState({
    member_id: '',
    member_pwd: '',
  });
  const { member_id, member_pwd } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!member_id){
      alert('아이디를 입력해주세요');
      return;
    }else if(!member_pwd){
      alert('비밀번호를 입력해주세요');
      return;
    }
    try {
      const response = await authApi.login(inputs);
      const { code, msg, token } = response;
      if(code === defaultCode.FAIL_CODE){
        alert(msg);

      }else if(token){
        setCookie('user', token);
      }

    }catch(e) {
      console.error(e);
      alert('로그인에 실패하였습니다');
    }
    
  };

 
  return (
    <>
      {cookies.user ? <Redirect to='/'/> 
        : 
      <Container>
        <h2>login</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' value={member_id} name='member_id' onChange={onChange} placeholder='아이디'/>
          <input type='text' value={member_pwd} name='member_pwd' onChange={onChange} placeholder='비밀번호'/>
          <button type='submit'>로그인</button>
        </form>
      </Container>
      
    }
      
    </>
  )
}

export default LoginPage;