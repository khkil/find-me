import axios from "../../node_modules/axios/index";

export const fetchTermsList = async () => {
  const {data} = await axios.get(`/api/v2/terms`);
  return data;
}