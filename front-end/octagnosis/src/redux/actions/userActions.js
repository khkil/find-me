import * as types from "../../constants";
import * as service from "../../services/userService";

export const getUserAnswers = (userIdx) => async dispatch  => {
  dispatch({ type: types.USER_ANSWER_LIST_REQUEST });
  try {
    const data = await service.getUserAnswers(userIdx);
    dispatch({ type: types.USER_ANSWER_LIST_SUCCESS, data: data });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.USER_ANSWER_LIST_FAILURE, error: e });
    
  } 
}

export const registUserAnswers = (param, history) => async dispatch  => {
  dispatch({ type: types.USER_ANSWER_REGIST_REQUEST });
  try {
    const { data } = await service.registUserAnswers(param);
    const { user_idx } = data;
    history.push(`/ground/users/${user_idx}`);
    dispatch({ type: types.USER_ANSWER_REGIST_SUCCESS, data: data});

  } catch (e) {
    console.error(e);
    dispatch({ type: types.USER_ANSWER_REGIST_FAILURE, error: e });
    
  } 
}
