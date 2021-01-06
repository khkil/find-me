import * as userAPI from '../api/user'; 
import {
  createPromiseThunk,
  reducerUtils,
  handleAsyncActions
} from '../lib/asyncUtils';

const GET_USER = 'GET_USER';
const INSERT_USER = 'INSERT_USER';

export const insertUser = createPromiseThunk(INSERT_USER, userAPI.insertUser);