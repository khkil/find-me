import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { withCookies, useCookies } from 'react-cookie';
import DashBoardPage from './pages/DashBoardPage';
import LoginPage from './pages/LoginPage';
import Header from './components/common/Header';
import Sidebar from './components/common/SideBar';


function App() {
  
  const [ cookies, setCookie, removeCookie ] = useCookies(['user']);
  const [ hasCookie, setHasCookie ] = useState(false);
  const [ showSideTags, setShowSideTags ] = useState(true);
  
  useEffect(() => {
    if(cookies.user && cookies.user !== 'undefined') {
      setHasCookie(true);
    }
  },[ cookies ])
  
  return (
    <>
      <Router>
        {!hasCookie ? <Redirect to='/login'/> : <Redirect to='/'/>}
        <header>
          <Header 
            showSideTags={showSideTags} 
            cookies={cookies} 
            removeCookie={removeCookie}
            hasCookie={hasCookie} 
            setHasCookie={setHasCookie} 
          />
        </header>
        <main>
        <Sidebar showSideTags={showSideTags} />
        <Switch>
          <Route 
            path="/login" 
            component={() =>
              <LoginPage 
                cookies={cookies} 
                setCookie={setCookie} 
                setShowSideTags={setShowSideTags}
              />
            } 
          exact />
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