import * as authApi from '../api/authApi';

const LOGIN_LOADING = 'auth/LOGIN';
const LOGIN_SUCCESS  = 'auth/LOGIN_SUCCESS ';
const LOGIN_ERROR = 'auth/LOGIN_ERROR';

export const login = (params) => async dispatch => {
  dispatch({ type: LOGIN_LOADING });
  try {
    const result = await authApi.login(params);
    dispatch({ type: LOGIN_SUCCESS, data: result });  

  }catch(e) {
    dispatch( {type: LOGIN_ERROR, error: e} )
  }
}

const initialState = {
  data: null,
  loading: false,
  error: ''
};

export default function auth(state = initialState, action) {

  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
        error:''
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
