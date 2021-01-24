import React from 'react';
import { Route, Switch } from 'react-router-dom';
import QuestionPage from './pages/QuestionPage';
import UserRegistPage from './pages/UserRegistPage';
import ErrorPage from './components/common/ErrorPage';
import ResultPage from './pages/ResultPage';
import StartPage from './pages/StartPage';
import AppPage from './pages/common/AppPage';

function App() {
  
  return (
    <>
      <AppPage>
          <Switch>
            <Route path="/pages/user" component={UserRegistPage} exact/>
            <Route path="/pages/result" component={ResultPage} exact/>
            <Route path="/pages/:page" component={QuestionPage} />
            <Route path="/" component={StartPage} exact />
            <Route path="*" component={ErrorPage}/>
          </Switch>
      </AppPage>
    </>
  );
}

export default App;