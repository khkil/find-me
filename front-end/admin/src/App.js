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
      <Router>
        {!cookies.user && <Redirect to='/login'/> }
          <Header 
            cookies={cookies} 
            removeCookie={removeCookie}
          />
        <Sidebar cookies={cookies}  />
        
          <Switch>
            <Route path="/login" component={() => <LoginPage cookies={cookies} setCookie={setCookie}/>}/>
            <Route path="/statistics" component={StatisticsPage} />
            <Route path="/" component={DashBoardPage} exact />

          </Switch>
        </Router> 
      
    </>
  );
}

export default App;