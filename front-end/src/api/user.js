import axios from "axios";

export const insertUser = (action) => {
  axios.get('/api/user/insert', action.payload);
}