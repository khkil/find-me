import axios from "../utils/axios";

axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

export const updateMember = (idx, member) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/member/${idx}`, member)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
        reject(response.data);
      })
      .catch((error) => {
        console.log(3);
        reject(error);
      });
  });
}

