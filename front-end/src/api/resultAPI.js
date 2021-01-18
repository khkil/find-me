import axios from "../../node_modules/axios/index";

export const getUserResult = async params => {
  const { data } = await axios.post('/api/result/user/select', params);
  return data;
}

export const insertUserResult = async params => {
  const result = await axios.post('/api/result/user/insert', params);
  return result;
}

export default getUserResult;