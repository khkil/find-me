import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import DashBoardPage from './pages/DashBoardPage';
import LoginPage from './pages/LoginPage';
import Header from './components/common/Header';
import Sidebar from './components/common/SideBar';


function App() {
  
  const [ cookies, setCookie, removeCookie ] = useCookies(['user']);
  console.log(cookies);

  return (
    <>
      <Router>
        {!cookies.user ? <Redirect to='/login'/> : <Redirect to='/'/>}
        <header>
          <Header 
            cookies={cookies} 
            removeCookie={removeCookie}
          />
        </header>
        <main>
        <Sidebar cookies={cookies}  />
        <Switch>
          <Route path="/login" component={() => <LoginPage cookies={cookies} setCookie={setCookie}/>} exact/>
          <Route path="/" component={DashBoardPage} exact />
        </Switch>
        </main>
        <footer>

        </footer>
      </Router>
    </>
  );
}

export default App;