import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import { Provider } from 'react-redux';

import './App.css';

// modules에서 정의된 reducer를 store안에 넣어주어 서로 연결한다.
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />

    <div>
      <h1 className="titleTextColor">TestCode!</h1>
      <button>시작하기</button>
    </div>

  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();