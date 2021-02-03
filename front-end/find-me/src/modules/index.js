import { combineReducers } from 'redux';
import question from './question';
import inspection from './inspection';
import result from './result';
import user from './user';

const rootReducer = combineReducers({ question, inspection, result, user });

export default rootReducer;