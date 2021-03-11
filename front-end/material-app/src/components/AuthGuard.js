import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const auth = useSelector((state) => state.authReducer);
  console.log(auth);

  console.log(1);
  useEffect(() => {
    console.log(2);
  })
  if (!auth.user) {
    //return <Redirect to="/auth/login" />;
  }

  return children;
}

export default AuthGuard;
