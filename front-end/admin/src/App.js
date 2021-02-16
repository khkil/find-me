import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoardPage from './pages/DashBoardPage';


function App() {
  
  return (
    <>
      <Switch>
        <Route path="/" component={DashBoardPage} exact />
      
      </Switch>
    </>
  );
}

export default App;