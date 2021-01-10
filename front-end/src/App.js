import React from 'react';
import { Route, Switch } from 'react-router-dom';
import QuestionPage from './pages/QuestionPage';
import UserRegistPage from './pages/UserRegistPage';
import { Container } from 'react-bootstrap';
import ErrorPage from './components/common/ErrorPage';

function App() {
  return (
    <>
      <Container>
        <Switch>
          <Route path="/pages/user" component={UserRegistPage} exact/>
          <Route path="/pages/:page" component={QuestionPage} />
          <Route path="*" component={ErrorPage}/>
        </Switch>
      </Container>
    </>
  );
}

export default App;