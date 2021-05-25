import * as types from "../../constants";
import * as memberService from "../../services/memberService";

export const updateMember = (idx, member) => async dispatch  => {
  dispatch({ type: types.MEMBER_UPDATE_REQUEST });
  try {
    const data = await memberService.updateMember(idx, member);
    dispatch({ type: types.MEMBER_UPDATE_SUCCESS, data: data });

  } catch (e) {
    dispatch({ type: types.MEMBER_UPDATE_FAILURE, error: e });
    
  } finally{
    dispatch({ type: types.MEMBER_UPDATE_RESET });
  }
}
