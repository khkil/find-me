import React from 'react';
import { Route } from 'react-router-dom';
import Loading from './components/common/Loading';
import QuestionPage from './pages/QuestionPage';

function App() {
  return (
    <>
      <Route path="/pages/:page" component={QuestionPage} />
    </>
  );
}

export default App;