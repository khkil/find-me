import * as types from "../../constants";

const initialState = { loading: false, data: null, error: null };

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    
    case types.GROUP_LIST_REQUEST:
      return {
        ...initialState,
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

    default:
      return state;
  }
}
