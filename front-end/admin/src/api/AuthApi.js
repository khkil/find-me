import axios from "../../node_modules/axios/index";

export const login = async params => {
  const { data } = await axios.post(`/api/auth/login`, params);
  return data;
}

export const getAuthInfo = async params => {
  const { data } = await axios.post(`/api/auth/info`, params);
  return data;
}