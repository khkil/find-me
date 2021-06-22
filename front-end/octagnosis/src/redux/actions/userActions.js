import * as types from "../../constants";
import * as service from "../../services/userService";

/* export const getGroupList = () => async dispatch  => {
  dispatch({ type: types.GROUP_LIST_REQUEST });
  try {
    const data = await service.getGroupList();
    dispatch({ type: types.GROUP_LIST_SUCCESS, data: data });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.GROUP_LIST_FAILURE, error: e });
    
  } 
} */

export const registUserAnswers = (param) => async dispatch  => {
  dispatch({ type: types.USER_ANSWER_REGIST_REQUEST });
  try {
    const data = await service.registUserAnswers(param);
    dispatch({ type: types.USER_ANSWER_REGIST_SUCCESS, data: data});

  } catch (e) {
    console.error(e);
    dispatch({ type: types.USER_ANSWER_REGIST_FAILURE, error: e });
    
  } 
}
