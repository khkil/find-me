import * as types from "../../constants";


const token = localStorage.getItem("token");

const initialState = { isLoggedIn: token !== null, loading: false, data: null, error: '' };

export default function reducer(state = initialState, action) {
  
  switch (action.type) {
    case types.AUTH_GET_INFO_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.AUTH_GET_INFO_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        data: action.data,
      };

    case types.AUTH_GET_INFO_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        data: null,
        error: action.error
      };

    case types.AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        data: null,
      };


    case types.AUTH_LOGIN_REQUEST:
      console.log('request', action);
      return {
        ...state,
        isLoggedIn: false,
        loading: true,
      };

    case types.AUTH_LOGIN_SUCCESS:
      
      return {
        ...state,
        data: action.data,
        isLoggedIn: true,
        loading: false
      };

    case types.AUTH_LOGIN_FAILURE:
      console.log('fail', action);
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        error: action.error
      };

    case types.AUTH_SIGN_OUT:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case types.AUTH_SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.AUTH_SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        data: action.data
      };
    case types.AUTH_SIGN_UP_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error
      };

    case types.AUTH_FIND_ID_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.AUTH_FIND_ID_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        data: action.data
      };
    case types.AUTH_FIND_ID_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error
      };

    case types.AUTH_SEND_SMS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.AUTH_SEND_SMS_SUCCESS:
      return {
        ...state,
        data: 'test',
        loading: false
      };
    case types.AUTH_SEND_SMS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
  

    default:
      return state;
  }
}
