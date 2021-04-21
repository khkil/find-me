import { Button, Paper, styled, Tab, Tabs, Typography } from '@material-ui/core';
import { padding } from 'polished';
import React, { useState } from 'react';

const FindInfo = () => {

  const Wrapper = styled(Paper)`
    padding: 10px;
  }`;

  const style = {
    padding: '30px',
  };

  const infoDef = {
    0: '아이디',
    1: '비밀번호'
  }

  const [value, setValue] = useState(0);


  return (
    <Wrapper style={style}>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        회원정보 찾기
      </Typography>
      <Paper square>
        <Tabs
          value={value}
          onChange={(e, newValue) => {setValue(newValue)}}
          indicatorColor="primary"
          textColor="primary"
          aria-label="disabled tabs example"
        >
          {Object.keys(infoDef).map((key, index) => 
            <Tab key={index} label={infoDef[key]} />
          )}
        </Tabs>
      </Paper>
     
      <div>

      </div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        로그인
      </Button>
    </Wrapper>
  )
}

export default FindInfo;