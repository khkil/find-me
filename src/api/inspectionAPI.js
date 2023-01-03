import axios from "../../node_modules/axios/index";

export const getInspection = async idx => {
  const { data } = await axios.get(`/api/inspections/1/pages/${idx}`);
  return data;
}