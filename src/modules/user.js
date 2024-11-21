import * as userAPI from '../api/userAPI';

const GET_USER_LOADING = 'GET_USER';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS ';
const GET_USER_ERROR = 'GET_USER_ERROR';


export const getUsers = (inspectionIdx) => async dispatch => {
  dispatch({type: GET_USER_LOADING});
  try {
    const userCount = await userAPI.fetchUsers(inspectionIdx);
    dispatch({type: GET_USER_SUCCESS, data: userCount});
  } catch (e) {
    dispatch({type: GET_USER_ERROR, error: e})
  }
}

const initialState = {
  data: null,
  loading: false,
  error: ''
};

export default function question(state = initialState, action) {

  switch (action.type) {
    case GET_USER_LOADING: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false
      }
    }
    case GET_USER_ERROR: {
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
