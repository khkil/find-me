import * as questionAPI from '../api/questionAPI';

const GET_QUESTIONS_LOADING = 'GET_QUESTIONS';
const GET_QUESTIONS_SUCCESS  = 'GET_QUESTIONS_SUCCESS ';
const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';


export const getQuestions = (id) => async dispatch => {
  dispatch({ type: GET_QUESTIONS_LOADING });
  try {
    const questions = await questionAPI.getQuestionsAPI(id);
    console.log(questions);
    dispatch({ type: GET_QUESTIONS_SUCCESS, data: questions });

  }catch(e) {
    dispatch( {type: GET_QUESTIONS_ERROR, error: e} )
  }
}

const initialState = {
  data: [],
  loading: false,
  error: ''
};

export default function question(state = initialState, action) {

  switch (action.type) {
    case GET_QUESTIONS_LOADING: {
      return {
        ...state,
        loading: true,
        error:''
      };
    }
    case GET_QUESTIONS_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false
      }
    }
    case GET_QUESTIONS_ERROR: {
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
