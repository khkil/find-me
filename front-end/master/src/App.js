import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
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

const Test = () => {
  const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)}px;
`;
  return (
    <Wrapper>
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        로그인
      </Typography>
      

    </Wrapper>
  )
}

function App() {
  
  return (
    <>
      <Test></Test>
    </>
  );
}

export default App;