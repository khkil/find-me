import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAuthInfo } from "../redux/actions/authActions";

// For routes that can only be accessed by authenticated users
const AuthGuard = ({ children, path }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token)
    dispatch(getAuthInfo());
  }, [])

  const { data, isLoggedIn } = useSelector(state => state.authReducer);
  if (!isLoggedIn) return <Redirect to='/admin/login' />;
  if (!data) return null;
  return children;

}

export default AuthGuard;
