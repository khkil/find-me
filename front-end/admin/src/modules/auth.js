import * as authApi from '../api/authApi';

const AUTH_INFOLOADING = 'auth/LOGIN';
const AUTH_INFOSUCCESS  = 'auth/AUTH_INFOSUCCESS ';
const AUTH_INFOERROR = 'auth/AUTH_INFOERROR';

export const getAuthInfo = (params) => async dispatch => {
  dispatch({ type: AUTH_INFOLOADING });
  try {
    const result = await authApi.getAuthInfo(params);
    dispatch({ type: AUTH_INFOSUCCESS, data: result });  

  }catch(e) {
    dispatch( {type: AUTH_INFOERROR, error: e} )
  }
}

const initialState = {
  data: null,
  loading: false,
  error: ''
};

export default function auth(state = initialState, action) {

  switch (action.type) {
    case AUTH_INFOLOADING: {
      return {
        ...state,
        loading: true,
        error:''
      };
    }
    case AUTH_INFOSUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false
      }
    }
    case AUTH_INFOERROR: {
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
