import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import reduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/global.css'


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);