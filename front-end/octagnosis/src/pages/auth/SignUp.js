import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { signUp } from "../../redux/actions/authActions";
import * as authService from "../../services/authService";
import {
  Badge,
  Box,
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import * as types from "../../constants";
import { Alert as MuiAlert } from "@material-ui/lab";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/;


const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [checkedId, setCheckedId] = useState(false);
  const [checkedIdMsg, setCheckedIdMsg] = useState("아이디를 입력해주세요.");
  const [auth, setAuth] = useState({
    time: 180,
    start: false,
    error: false,
    completed: false
  })
 
  const idInputRef = useRef();
  const passwordInputRef = useRef();
  const submitButtonRef = useRef();

  const checkId = async (id, errors) => {
    if(!id){
      idInputRef.current.focus();
      setCheckedIdMsg('아이디를 입력해주세요.');
      return;

    }else if(id.length < 5 || id.length > 20){
      idInputRef.current.focus();
      setCheckedIdMsg('아이디는 5자 이상 20자 이하만 가능합니다.');
      return;
    }
    
    const { success, code } = await authService.checkId(id);
    if(success && code === types.SUCCESS_CODE){
      setCheckedId(true);
      setTimeout(() => {
        passwordInputRef.current.focus();
      }, 200)
    }else{
      setCheckedIdMsg("이미 사용중인 아이디 입니다.");
      setCheckedId(false);
      setTimeout(() => {
        idInputRef.current.focus();
      }, 200)
      
    }
    
  }

  const sendAuthSms = async (to) => {
    const param = {
      to: to
    };
    const { success, code, error } = await authService.sendAuthSms(param);
    if(success && code === types.SUCCESS_CODE){
      alert('인증번호가 발송되었습니다');
      setAuth({
        ...auth,
        start: true
      })
    }else{
      alert('통신오류가 발생하였습니다.');
      console.error(error);
    
    }
  }

  const validateSms = async (number) => {
    const param = {
      number: number
    };
    const { success, code, error } = await authService.validateAuthSms(param);
    if(success && code === types.SUCCESS_CODE){
      alert('인증에 성공하였습니다.');
      setAuth({
        ...auth,
        completed: true
      })
    }else{
      alert('인증번호가 다릅니다.')
      console.error(error);
    
    }
  }

  const timeFormat = (time) => {
    const m = Math.floor(time / 60).toString()
    let s = (time % 60).toString()
    if (s.length === 1) s = `0${s}`
    return `${m}:${s}`
  }
 
 
  useEffect(() => {
    if(auth.time > 0 && auth.start){
      const timer = setInterval(() => {
        setAuth({
          ...auth,
          time: auth.time -1
        })     
     }, 1000);
     
     return () => clearInterval(timer);
    }
  }, [auth]);

  return (
    <Wrapper>
      <Helmet title="회원가입" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        회원가입
      </Typography>

      <Formik
        initialValues={{
          name: "",
          id: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          authNumber: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          id: Yup.string()
            .min(5, "5자이상 입력해주세요")
            .max(20, "20자까지 입력 가능합니다")
            .required("ID를 입력해주세요")
            .test('check_id', checkedIdMsg, () => checkedId),
          name: Yup.string()
            .max(255)
            .required("이름을 입력해주세요"),
          email: Yup.string()
            .email("이메일 형식에 맞게 입력해주세요")
            .max(255)
            .required("이메일을 입력해주세요"),
          password: Yup.string()
            .min(6, "6자이상 입력해주세요")
            .max(255)
            .required("비밀번호를 입력해주세요"),
          confirmPassword: Yup.string()
            .required("비밀번호 확인을 입력해주세요")
            .when("password", {
              is: (val) => (val && val.length > 0 ? true : false),
              then: Yup.string().oneOf(
                [Yup.ref("password")],
                "비밀번호가 일치하지 않습니다"
              ),
            }),
          phone: Yup.string()
          .required("휴대폰 번호를 입력해주세요")
          .matches(phoneRegExp, "-을 포함해 정확한 형식으로 입력해주세요"),
          authNumber: Yup.string()
          .required("인증번호를 입력해주세요")
          .matches(/^[0-9]/g, "숫자만 입력 가능합니다.")
          .test("authNumber", "인증을 진행해주세요",() => auth.completed)
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
             dispatch(
              signUp({...values, role: 'ROLE_MEMBER'}, history)
            );
            //history.push("/auth/login");
          } catch (error) {
            const message = error.message || "Something went wrong";

            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            {errors.submit && (
              <Alert mt={2} mb={1} severity="warning">
                {errors.submit}
              </Alert>
            )}
            
            <TextField
              type="text"
              name="id"
              label="아이디"
              value={values.id}
              error={Boolean(touched.id && errors.id && !checkedId)}
              fullWidth
              helperText={(touched.id && !checkedId) && checkedIdMsg }
              onBlur={handleBlur}
              onChange={e => {
                setCheckedIdMsg("아이디 중복 체크를 해주세요");
                setCheckedId(false);
                handleChange(e)
              }}
              my={3}
              inputRef={idInputRef}
            />
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={() => {checkId(values.id, errors);}}
              disabled={!values.id || '' === values.id}
            >
              중복체크
            </Button>
            <TextField
              type="password"
              name="password"
              label="비밀번호"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
              inputRef={passwordInputRef}
            />
            <TextField
              type="password"
              name="confirmPassword"
              label="비밀번호 확인"
              value={values.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              fullWidth
              helperText={touched.confirmPassword && errors.confirmPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="text"
              name="name"
              label="이름"
              value={values.name}
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              my={3}
            />
            <TextField
              type="phone"
              name="phone"
              label="휴대폰 번호"
              value={values.phone}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="-을 포함해 정확한 형식으로 입력해주세요"
              fullWidth
              my={3}
            />
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={() => {sendAuthSms(values.phone)}}
              disabled={Boolean(!touched.phone || (touched.phone && errors.phone))}
            >
              인증번호 받기
            </Button>
            <Box>
              <TextField
                type="authNumber"
                name="authNumber"
                label="인증번호"
                value={values.authNumber}
                error={Boolean(touched.authNumber && errors.authNumber)}
                helperText={touched.authNumber && errors.authNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={!auth.start}
                fullWidth
                my={3}
              />
              {auth.start &&
                <Box mb={4}>
                  <Typography component="h2" variant="body1" >
                    휴대폰 번호로 전송된 인증번호를 시간내로 입력해주세요 
                      <Badge badgeContent={timeFormat(auth.time)} color="error" variant="standard" style={{marginLeft: "2rem"}}/>
                  </Typography>
                  
                </Box>
              }
              
              <Button
                variant="outlined" 
                color="secondary" 
                disabled={!auth.start}
                onClick={() => {validateSms(values.authNumber)}}
              >
                인증
              </Button>
            </Box>
            
              <Box mt={4}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  inputRef={submitButtonRef}
                  disabled={isSubmitting}
                >
                  Sign up
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignUp;
