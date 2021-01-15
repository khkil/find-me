import axios from "../../node_modules/axios/index";

export const getUserResult = async params => {
  const { data } = await axios.post('/api/result/user', params);
  console.log(111);
  return data;
}

export default getUserResult;