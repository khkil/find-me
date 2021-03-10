import * as types from "../../constants";


const initialState = {
  data: null,
  loading: false,
  error: ''
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.AUTH_SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        error:''
      };


    case types.AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };
  
    case types.AUTH_SIGN_IN_FAILURE:
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
