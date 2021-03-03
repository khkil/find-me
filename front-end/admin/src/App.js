import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import DashBoardPage from './pages/DashBoardPage';
import LoginPage from './pages/LoginPage';
import Header from './components/common/Header';
import Sidebar from './components/common/SideBar';
import StatisticsPage from './pages/result/StatisticsPage';


function App() {
  
  const [ cookies, setCookie, removeCookie ] = useCookies(['user']);

  return (
    <>
        {!cookies.user && <Redirect to='/login'/> }
          <Header 
            cookies={cookies} 
            removeCookie={removeCookie}
          />
        
        <Sidebar cookies={cookies}  />
        <Switch>
          <Route path="/login" component={() => <LoginPage cookies={cookies} setCookie={setCookie}/>} exact/>
          <Route path="/statistics" component={StatisticsPage} exact />
          <Route path="/" component={DashBoardPage} exact />

        </Switch>
       
    </>
  );
}

export default App;