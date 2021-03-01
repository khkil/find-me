import axios from "../../node_modules/axios/index";

export const getUserResult = async params => {
  const { data } = await axios.post('/api/results', params);
  return data;
}

