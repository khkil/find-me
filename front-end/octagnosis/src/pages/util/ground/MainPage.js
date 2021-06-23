import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Paper, styled, Tab, Tabs, Typography } from '@material-ui/core';
import { MobileScreenShare, Person } from '@material-ui/icons';
import Box from '@material-ui/core/Box';

const MainPage = ({ history }) => {

  const Wrapper = styled(Paper)`
    padding: 10px;
  }`;

  const style = {
    padding: '100px',
  };

  const valueMap = {
    0: '아이디',
    1: '비밀번호'
  }

  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log(history);
  })

  return (
    <Container style={style}>
      <Typography component="h1" variant="h3" align="center" gutterBottom>
        지면검사 관리 페이지
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h6" align="center" gutterBottom>
            메뉴를 선택해주세요
          </Typography>
        </Grid> 
        <Grid item xs={6}>
          <Button type="button" fullWidth variant="contained" color="primary" size="large" onClick={() => { history.push("/ground/regist")}}>
            <Box p={3}>지면 검사 등록</Box>
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button type="button" fullWidth variant="contained" variant="contained" size="large" onClick={() => { history.push("/ground/users")}}>
            <Box p={3}>지면 검사 결과목록</Box>
          </Button>
        </Grid>
        
     
        {/* <Grid item xs={12}>
          <Typography component="h1" variant="h6" align="center" gutterBottom>
            메뉴를 선택해주세요
          </Typography>
        </Grid> */}
        
        {/* <Grid item xs={12}>
          <Link to="/auth/find-info/id?type=phone">
            <Button type="button" width="50%" variant="contained" color="primary" size="large">
              <MobileScreenShare/> 
              <Box p={3}>휴대폰으로 찾기</Box>
            </Button>
            <Button type="button"  variant="contained" color="primary" size="large">
              <MobileScreenShare/> 
              <Box p={3}>휴대폰으로 찾기</Box>
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/auth/find-info/id?type=info">
            <Button type="submit"  variant="contained" color="primary" size="large">
              <Person/>
              <Box p={3}>이름, 이메일로 찾기</Box>
            </Button>
          </Link>
        </Grid> */}
      </Grid>
    </Container>
  )
}

export default MainPage;