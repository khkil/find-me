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
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from "@material-ui/lab";
import { getAuthInfo, login } from "../../redux/actions/authActions";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
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

function SignIn({ history }) {

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    const { id, password } = e;
    const credentials = { id: id, password: password, role: 'ROLE_ADMIN' };
    dispatch(login(credentials));

  
  };

  return (
    <Wrapper>
      <Helmet title="로그인" />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        옥타그노시스 관리자 페이지
      </Typography>
      <Formik
        initialValues={{
          id: "",
          password: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          id: Yup.string().required("아이디를 입력하세요"),
          password: Yup.string().max(255).required("비밀번호를 입력하세요"),
        })}
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
              label="ID"
              value={values.id}
              error={Boolean(touched.id && errors.id)}
              fullWidth
              helperText={touched.id && errors.id}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <TextField
              type="password"
              name="password"
              label="Password"
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              my={2}
            />
            <p style={{ color: '#f44336' }}>{errorMsg}</p>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="계정정보 저장"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              로그인
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignIn;
