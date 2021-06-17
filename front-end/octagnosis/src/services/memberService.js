import axios from "../utils/axios";

axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

export const getMemberList =() => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/members`)
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

export const getMemberDetail =(idx) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/admin/members/${idx}`)
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

