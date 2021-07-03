import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAuthInfo } from "../redux/actions/authActions";

const AuthGuard = ({ children, path }) => {
  
  const dispatch = useDispatch();

  const isAdminPage = (
    path.indexOf("admin") > -1 
    || path.indexOf("ground") > -1
  );
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if(token){
      console.log('통신');
      dispatch(getAuthInfo());
    }
  }, [token, path]);

  const redirectPath = `/${isAdminPage ? "admin" : "auth"}/login`;

  const { data, isLoggedIn } = useSelector(state => state.authReducer);
  if (!isLoggedIn && !data) return <Redirect to={redirectPath} />;
  if (!data) return null;
  return children;

}

export default AuthGuard;
