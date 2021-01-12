const GET_INSPECTION_LOADING = 'GET_INPSECTION';
const GET_INSPECTION_SUCCESS  = 'GET_INSPECTION_SUCCESS ';
const GET_INSPECTION_ERROR = 'GET_INSPECTION_ERROR';


export const getInspection = (value) => async dispatch => {
  dispatch({ type: GET_INSPECTION_LOADING });
  try {
    //const questions = await questionAPI.getQuestionsAPI(id);
    const inspection = {inspection_idx: 1, totalPages: 15}; //To-do insectopn api 구현 해야함
    //console.log(questions);
    dispatch({ type: GET_INSPECTION_SUCCESS, data: inspection });
    

  }catch(e) {
    dispatch( {type: GET_INSPECTION_ERROR, error: e} )
  }
}

const initialState = {
  data: null,
  loading: false,
  error: ''
};

export default function inspection(state = initialState, action) {

  switch (action.type) {
    case GET_INSPECTION_LOADING: {
      return {
        ...state,
        loading: true,
        error:''
      };
    }
    case GET_INSPECTION_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false
      }
    }
    case GET_INSPECTION_ERROR: {
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
