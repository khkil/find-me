import { combineReducers } from 'redux';
import question from './question';
import inspection from './inspection';

const rootReducer = combineReducers({ question, inspection });

export default rootReducer;