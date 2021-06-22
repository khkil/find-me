import * as types from "../../constants";

const initialState = { loading: false, data: null, error: null };

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    
    case types.GROUP_LIST_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.GROUP_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.data
      };
    case types.GROUP_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    case types.GROUP_REGIST_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.GROUP_REGIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, actions.data]
      };
    case types.GROUP_REGIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };


    default:
      return state;
  }
}
