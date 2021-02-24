import { combineReducers } from 'redux';
import question from './question';
import inspection from './inspection';
import result from './result';
import user from './user';
import auth from './auth';

const rootReducer = combineReducers({ question, inspection, result, user, auth });

export default rootReducer;