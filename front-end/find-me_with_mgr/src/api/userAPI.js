import axios from "../../node_modules/axios/index";

export const getUserCount = async inspectionIdx => {
  const { data } = await axios.get(`/api/user/count/${inspectionIdx}`);
  return data;
}