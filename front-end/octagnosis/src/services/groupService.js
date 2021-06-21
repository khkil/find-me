import axios from "../utils/axios";


export const getGroupList = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/groups`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}