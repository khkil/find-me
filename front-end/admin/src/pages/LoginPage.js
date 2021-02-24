import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import * as authApi from '../api/authApi';
import * as defaultCode from '../util/defaultCode';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ cookies, setCookie, setShowSideTags }) => {
  const [inputs, setInputs] = useState({
    user_id: '',
    user_pwd: '',
  });

  const { user_id, user_pwd } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!user_id){
      alert('아이디를 입력해주세요');
      return;
    }else if(!user_pwd){
      alert('비밀번호를 입력해주세요');
      return;
    }
    try {
      const response = await authApi.login(inputs);
      const { code, msg, token } = response;
      console.log(response);
      if(code === defaultCode.FAIL_CODE){
        alert(msg);

      }else if(token){
        setCookie('user', token);
        setShowSideTags(true);
      }

    }catch(e) {
      console.error(e);
      alert('로그인에 실패하였습니다');
    }
    
  };

  useEffect(() => {
    if(!cookies.user){
      setShowSideTags(false);
    }
  }, [])

 
  return (
    <>
      <Container>
        <h2>login</h2>
        <form onSubmit={handleSubmit}>
          <input type='text' value={user_id} name='user_id' onChange={onChange} placeholder='아이디'/>
          <input type='text' value={user_pwd} name='user_pwd' onChange={onChange} placeholder='비밀번호'/>
          <button type='submit'>로그인</button>
        </form>
        <h2>{JSON.stringify(inputs)}</h2>
      </Container>
    </>
  )
}

export default LoginPage;