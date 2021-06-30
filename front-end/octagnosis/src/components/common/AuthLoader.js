import { CircularProgress, makeStyles } from '@material-ui/core';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import React from 'react';



const AuthLoader = ({ loading }) => {
  const useStyles = makeStyles({
    loader: {
      margin: "0 auto",
      position: "relative",
      display: "block",
      padding: "10px"
    }
  });
  const classes = useStyles();
  
  if(!loading) return null;
  return (
    <CircularProgress className={classes.center} /> 
  )
}

export default AuthLoader;