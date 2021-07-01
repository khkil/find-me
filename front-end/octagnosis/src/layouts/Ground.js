import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const Ground = ({ children }) => {

  const history = useHistory();
  return (
    <React.Fragment>

      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            News
        </Typography>
          <Button color="inherit">Login</Button> */}
          <Grid container alignItems="center">
            <Button color="inherit" onClick={() => { history.push("/ground")}}>
              <Typography variant="h3">
                지면검사 관리 페이지
              </Typography>
            </Button>
            <Grid item xs />
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </React.Fragment>
  )
}

export default Ground;