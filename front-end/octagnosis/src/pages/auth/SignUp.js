import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import { signUp } from "../../redux/actions/authActions";
import * as authService from "../../services/authService";
import {
  Button,
  Paper,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import * as types from "../../constants";
import { Alert as MuiAlert } from "@material-ui/lab";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)}px;
  }
`;



function SignUp() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [checkedId, setCheckedId] = useState(false);
  const idInputRef = useRef();
  const passwordInputRef = useRef();

  const checkId = async (id, errors) => {
    if(!id || id.length < 5){
      return;
    }
    const { success, code } = await authService.checkId(id);

    if(success && code === types.SUCCESS_CODE){
      alert('사용 가능한 아이디 입니다.')
      setCheckedId(true);
      passwordInputRef.current.focus();
      console.log(passwordInputRef);
      errors.id = null;

    }else{
      alert('사용중인 아이디 입니다.')
      setCheckedId(false);
      idInputRef.current.focus();
    }
    
  }

  return (
    <Wrapper>
      <Helmet title="Sign Up" />

      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Get started
      </Typography>
      <Typography component="h2" variant="body1" align="center">
        Start creating the best possible user experience for you customers
      </Typography>

      <Formik
        initialValues={{
          name: "",
          id: "",
          email: "",
          password: "",
          confirmPassword: "",
          submit: false,
        }}
        validationSchema={Yup.object().shape({
          id: Yup.string()
            .min(5, "5자이상 입력해주세요")
            .max(20)
            .required("ID를 입력해주세요")
            .test('check_id', '아이디 중복체크를 해주세요', () => checkedId),
          name: Yup.string()
            .max(255)
            .required("Name is required"),
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
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values);
          try {
             dispatch(
              signUp({
                name: "test",
                id: "test",
                email: values.email,
                password: values.password,
              })
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
              helperText={!checkedId && errors.id }
              onBlur={handleBlur}
              onChange={e => {
                setCheckedId(false);
                handleChange(e)
              }}
              my={3}
              ref={idInputRef}
            />
            <input
              name="name"
              placeholder="이름"
              value=""
              ref={passwordInputRef}
            />
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={() => {checkId(values.id, errors);}}
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
              label="Name"
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
              label="Email Address"
              value={values.email}
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              my={3}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Sign up
            </Button>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}

export default SignUp;
