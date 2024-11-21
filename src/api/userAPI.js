import axios from "../../node_modules/axios/index";

export const fetchUsers = async inspectionIdx => {
  const {data} = await axios.get(`/api/users/inspections/${inspectionIdx}`);
  return data;
}

export const fetchUserCounts = async inspectionIdx => {
  const {data} = await axios.get(`/api/users/inspections/${inspectionIdx}/counts`);
  return data;
}

export const insertUserAnswer = async params => {
  const {data} = await axios.post('/api/users/answers', params);
  return data;
}

export const insertUserPrivacy = async (userIdx, params) => {
  try {
    const {data} = await axios.post(`/api/v2/users/${userIdx}/privacy`, params);
    console.log(1, data)
    return data;
  } catch (error) {
    console.log(error);
  }
}