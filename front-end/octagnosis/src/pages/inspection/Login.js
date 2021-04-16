import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Avatar,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { getAuthInfo, login } from "../../redux/actions/authActions";


const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  width: 400px;
  padding: ${(props) => props.theme.spacing(6)}px;
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)}px;
`;

function Login({ history }) {

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const [useCode, setUseCode] = useState(false);
  

  const handleSubmit = async (e) => {
    const { id, password } = e;
    console.log(e);
    const credentials = { id: id, password: password, role: 'ROLE_MEMBER' };
    const { success, msg, code } = await login(credentials, history);
    if(msg){
      setErrorMsg(msg);
    }
  };

  
  let validationSchema = {
    id: Yup.string().required("아이디를 입력하세요"),
    password: Yup.string().max(255).required("비밀번호를 입력하세요"),
  }
  if(useCode){
    validationSchema.code = Yup.string().required("회차코드를 입력하세요");
  }else{
    delete validationSchema.code;
  }
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getAuthInfo());
    }
  }, [])
  const { isLoggedIn } = useSelector(state => state.authReducer);
  if(isLoggedIn) return <Redirect to='/' />;
  return (
    <Wrapper>
      <Helmet title="로그인" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        로그인
      </Typography>
      <Formik
        onChangeForm={(e) => {console.log(e)}}
        initialValues={{
          id: "",
          password: "",
          code: "",
          member_type: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape(validationSchema)}
        onSubmit={handleSubmit}
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
              type="id"
              name="id"
              label="아이디"
              value={values.id}
              error={Boolean(touched.id && errors.id)}
              fullWidth
              helperText={touched.id && errors.id}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                setErrorMsg('');
              }}
              my={2}
            />
            <TextField
              type="password"
              name="password"
              label="비밀번호"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e);
                setErrorMsg('');
              }}
              my={2}
            />
             {useCode &&  
              <TextField
                type="code"
                name="code"
                label="회차코드"
                value={values.code}
                fullWidth
                error={Boolean(touched.code && errors.code)}
                helperText={touched.code && errors.code}
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setErrorMsg('');
                }}
                my={2}
                />
            }
            
            <RadioGroup 
              row aria-label="position" 
              name="member_type" 
              defaultValue="individual"
              onChange={(e) => { 
                values.member_type = e.target.value;
                handleChange;
                setErrorMsg('');
                setUseCode('group' === e.target.value ? true : false);

              }}>
              <FormControlLabel control={<Radio color="primary" value="individual"/>} label="개인회원" />
              <FormControlLabel control={<Radio color="primary" value="group"/>} label="단체회원" />
            </RadioGroup>
            <p style={{ color: '#f44336' }}>{errorMsg}</p>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="계정정보 저장"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              로그인
              
            </Button>
            <Grid container style={{marginTop: '20px'}}>
              <Grid item xs>
                <Link to="/auth/sign-up" variant="body2">
                  회원가입
                </Link>
              </Grid>

              <Grid item xs>
                <Link to="#" variant="body2">
                  아이디 찾기
                </Link>
              </Grid>
              
              <Grid item>
                <Link to="#" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default Login;
