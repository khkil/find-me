import React, { useEffect, useState } from 'react';
import { Box, Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from "yup";
import { padding } from 'polished';
import { useDispatch } from 'react-redux';
import { findId } from '../../redux/actions/authActions';


const InfoType = ({ type }) => {

  const dispatch = useDispatch();
  const useStyles = makeStyles({
    root: {
      padding: '30px',
    },
    text: {
      marginBottom: '10px',
    },
    error_text: {
      color: '#f44336' 
    }
   
  });
  const classes = useStyles();

  const initialValues = {
    name: '',
    email: ''
  }
  const validationSchema = {
    name: Yup.string().required("이름을 입력하세요"),
    email: Yup.string().email("이메일 형식에 맞게 입력 해주세요").max(255).required("이메일을 입력하세요"),
  }
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = (crenditials) => {
    
    dispatch(findId(crenditials, type));
    setErrorMsg("일치하는 정보가 없습니다")
  }

  useEffect(() => {
    console.log(type);
  })
  return (
    <>
    <Paper className={classes.root}>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        <Box p={4}>이름, 이메일로 찾기</Box>
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape(validationSchema)}
        onSubmit={onSubmit}
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
          <TextField
            type="name"
            name="name"
            label="이름"
            className={classes.text}
            value={values.name}
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            onBlur={handleBlur}
            onChange={(e) => {
              handleChange(e);
            }}
            my={2}
          />
          <TextField
            type="email"
            name="email"
            label="이메일"
            className={classes.text}
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={(e) => {
              handleChange(e);
            }}
            my={2}
          />
          <p className={classes.error_text}>{errorMsg}</p>
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
    </Paper>
    </>
  );
}

export default InfoType;