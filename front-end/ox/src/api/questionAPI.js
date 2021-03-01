import axios from "../../node_modules/axios/index";

export const getQuestions = async (inspextion_idx, page) => {
  const { data } = await axios.get(`/api/questions/inspections/${inspextion_idx}/pages/${page}`);
  return data;
}