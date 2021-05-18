import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAuthInfo } from "../redux/actions/authActions";

const AuthGuard = ({ children, path }) => {
  
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if(token){
      console.log('통신');
      dispatch(getAuthInfo());
    }
  }, [token]);

  const redirectPath = path.indexOf("admin") > -1 ? "/admin/login" : "/auth/login";
  const { data, isLoggedIn } = useSelector(state => state.authReducer);
  if (!isLoggedIn && !data) return <Redirect to={redirectPath} />;
  if (!data) return null;
  return children;

}

export default AuthGuard;
