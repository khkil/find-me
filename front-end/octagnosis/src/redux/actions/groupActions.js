import * as types from "../../constants";
import * as service from "../../services/groupService";

export const getGroupList = () => async dispatch  => {
  dispatch({ type: types.GROUP_LIST_REQUEST });
  try {
    const data = await service.getGroupList();
    dispatch({ type: types.GROUP_LIST_SUCCESS, data: data });

  } catch (e) {
    console.error(e);
    dispatch({ type: types.GROUP_LIST_FAILURE, error: e });
    
  } 
}