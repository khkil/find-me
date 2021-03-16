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
import { getAuthInfo, signIn } from "../../redux/actions/authActions";
import { login } from "../../services/authService";

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

    const [errorMsg, setErrorMsg] = useState('');
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });

    }
    const handleSubmit = async (e) => {
        const { id, password } = e;
        const credentials = { member_id: id, member_pwd: password };
        await login(credentials)
            .then(response => {
                if (response.msg) {
                    setErrorMsg(response.msg);
                    return;
                } else if (response.token) {
                    const { token } = response;
                    localStorage.setItem('token', token);
                    history.push('/');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(getAuthInfo());
        }
    }, [token]);
    const { isLoggedIn } = useSelector(state => state.authReducer);
    if (isLoggedIn) return <Redirect to='/' />;

    return (
        <Wrapper>
            <Helmet title="Sign In" />

            <Typography component="h1" variant="h4" align="center" gutterBottom>
                옥타그노시스 관리자 페이지
      </Typography>
            <Formik
                initialValues={{
                    member_id: "",
                    member_pwd: "",
                    submit: false,
                }}
                validationSchema={Yup.object().shape({
                    member_id: Yup.string().required("아이디를 입력하세요"),
                    member_pwd: Yup.string().max(255).required("비밀번호를 입력하세요"),
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
                            name="member_id"
                            label="ID"
                            value={values.member_id}
                            error={Boolean(touched.member_id && errors.member_id)}
                            fullWidth
                            helperText={touched.member_id && errors.member_id}
                            onBlur={handleBlur}
                            onChange={onChange}
                            my={2}
                        />
                        <TextField
                            type="password"
                            name="member_pwd"
                            label="Password"
                            value={values.password}
                            error={Boolean(touched.member_pwd && errors.member_pwd)}
                            fullWidth
                            helperText={touched.member_pwd && errors.member_pwd}
                            onBlur={handleBlur}
                            onChange={onChange}
                            my={2}
                        />
                        <p>{errorMsg}</p>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="계정정보 저장"
                        />
                        {JSON.stringify(inputs)}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
            </Button>
                        {/* <Button
              component={Link}
              to="/auth/reset-password"
              fullWidth
              color="primary"
            >
              Forgot password
            </Button> */}
                    </form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default SignIn;