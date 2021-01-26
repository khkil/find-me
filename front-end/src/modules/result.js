import * as resultAPI from '../api/resultAPI';

const GET_RESULT_LOADING = 'GET_RESULT';
const GET_RESULT_SUCCESS  = 'GET_RESULT_SUCCESS ';
const GET_RESULT_ERROR = 'GET_RESULT_ERROR';

export const getUserResult = (params) => async dispatch => {
  dispatch({ type: GET_RESULT_LOADING });
  try {
    const result = await resultAPI.getUserResult(params);
    setTimeout(() => {
      dispatch({ type: GET_RESULT_SUCCESS, data: result });  
    }, 3000);

  }catch(e) {
    dispatch( {type: GET_RESULT_ERROR, error: e} )
  }
}

const initialState = {
  data: null,
  loading: false,
  error: ''
};

export default function result(state = initialState, action) {

  switch (action.type) {
    case GET_RESULT_LOADING: {
      return {
        ...state,
        loading: true,
        error:''
      };
    }
    case GET_RESULT_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false
      }
    }
    case GET_RESULT_ERROR: {
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
