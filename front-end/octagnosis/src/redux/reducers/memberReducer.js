import * as types from "../../constants";

const initialState = { loading: false, data: null, error: null };

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    
    case types.MEMBER_UPDATE_RESET:
      return initialState;

    case types.MEMBER_UPDATE_REQUEST:
      return {
        ...initialState,
        loading: true
      };

    case types.MEMBER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.data
      };
    case types.MEMBER_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    default:
      return state;
  }
}
