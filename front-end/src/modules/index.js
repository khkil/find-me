import { combineReducers } from 'redux';
import question from './question';
import inspection from './inspection';
import result from './result';

const rootReducer = combineReducers({ question, inspection, result });

export default rootReducer;