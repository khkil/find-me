import axios from "../../node_modules/axios/index";

export const getUsers = async inspectionIdx => {
  const { data } = await axios.get(`/api/users/inspections/${inspectionIdx}`);
  return data;
}

export const getUserCounts = async inspectionIdx => {
  const { data } = await axios.get(`/api/users/inspections/${inspectionIdx}/counts`);
  return data;
}

export const insertUserAnswer = async params => {
  const result = await axios.post('/api/users/answers', params);
  return result;
}