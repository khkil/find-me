import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAuthInfo } from "../redux/actions/authActions";

// For routes that can only be accessed by authenticated users
const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('auth guard.', location);
    dispatch(getAuthInfo());
  }, [])

  const { isLoggedIn } = useSelector(state => state.authReducer);
  if (!isLoggedIn) return <Redirect to='/auth/login' />;
  return children;

}

export default AuthGuard;
