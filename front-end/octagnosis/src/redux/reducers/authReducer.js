import * as types from "../../constants";


const token = localStorage.getItem("token");

const initialState = { isLoggedIn: token !== null, data: null, error: '' };

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case types.AUTH_GET_INFO_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
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
      return {
        ...state,
        loading: true,
        error: ''
      };

    case types.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };

    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case types.AUTH_SIGN_OUT:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
