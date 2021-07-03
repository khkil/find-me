import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAuthInfo } from "../redux/actions/authActions";
import * as types from "../constants";

const AuthGuard = ({ children, path }) => {
  
  const dispatch = useDispatch();

  const isAdminPage = (
    path.indexOf("admin") > -1 
    || path.indexOf("ground") > -1
  );
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    console.log("auth guard");
    console.log("isAdminPage", isAdminPage);
    if(token){
      dispatch(getAuthInfo());
    }
  }, [token]);

  const redirectPath = `/${isAdminPage ? "admin" : "auth"}/login`;

  const { data, isLoggedIn } = useSelector(state => state.authReducer);
  if (!isLoggedIn) return <Redirect to={redirectPath} />;
  if(isAdminPage && isLoggedIn && data){
    const { role } = data.member ? data.member : data;
    if(role !== types.ROLE_ADMIN) return <Redirect to="/" />;
  }
  if (!data) return null;
  return children;

}

export default AuthGuard;
