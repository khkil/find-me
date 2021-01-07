import axios from "../../node_modules/axios/index";

export const getQuestionsAPI = async page => {
  const { data } = await axios.get(`/api/inspections/1/pages/${page}`);
  return data;
}