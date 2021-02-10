import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoard from './pages/DashBoard';


function App() {
  
  return (
    <>
      <Switch>
        <Route path="/" component={DashBoard} exact />
      
      </Switch>
    </>
  );
}

export default App;