import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import DashBoardPage from './pages/DashBoardPage';
import LoginPage from './pages/LoginPage';


function App() {
  
  const [ cookies, removeCookie ] = useCookies(['user']);
  const [ hasCookie, setHasCookie ] = useState(false);
  useEffect(() => {
    if(cookies.user && cookies.user !== 'undefined'){
      setHasCookie(true);
    }
  }, [cookies])
  return (
    <>
      {!hasCookie && <Redirect to='/login'/>}
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/" component={DashBoardPage} exact />
      </Switch>
    </>
  );
}

export default App;