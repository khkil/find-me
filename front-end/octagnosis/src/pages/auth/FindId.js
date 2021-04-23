import React, { useEffect } from 'react';
import queryString from "query-string";
import { Redirect } from 'react-router';
import { Paper, styled, Typography, FormControl, Button, Box, Grid } from '@material-ui/core';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import InfoType from '../../components/auth/InfoType';

const FindId = ({ location }) => {
  const query = queryString.parse(location.search);
  const { type } = query;
  
  const Wrapper = styled(Paper)`
    padding: 10px;
  }`;

  const style = {
    padding: '30px',
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  return(
    
    <>
      {
        type === "phone" ? 
          <Wrapper style={style}>
            <Typography component="h1" variant="h3" align="center" gutterBottom>
              회원정보 찾기
            </Typography>
            <ValidatorForm onSubmit={onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <TextValidator
                  label="login"
                  name="login"
                  validators={['required']}
                  errorMessages={['login is required.']}
                />
              </FormControl>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" size="small">
                  <Box>확인</Box>
                </Button>

              </Grid>
              
            </ValidatorForm>
          </Wrapper>
        : type === "info" ? 
          <InfoType type={type}/>
        : <Redirect to="/"/>
      }
    </>
  )
}

export default FindId;