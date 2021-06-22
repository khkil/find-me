import * as types from "../../constants";

const initialState = { loading: false, data: null, error: null };

export default function reducer(state = initialState, actions) {
  switch (actions.type) {

    case types.USER_ANSWER_REGIST_REQUEST:
      return {
        ...initialState,
        loading: true
      };

    case types.USER_ANSWER_REGIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: actions.data
      };
    case types.USER_ANSWER_REGIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: actions.error
      };

    default:
      return state;
  }
}
