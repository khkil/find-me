import axios from "../utils/axios";

const token = localStorage.getItem('token');
axios.interceptors.request.use((config) => {
  return config;
});

export const updateMember = (idx, member) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/memmber/${idx}`, member)
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

