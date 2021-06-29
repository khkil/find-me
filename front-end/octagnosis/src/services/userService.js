import axios from "../utils/axios";

export const getUserList = (inspectionIdx, page) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/users/inspections/${inspectionIdx}/pages/${page}`)
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

export const getUserAnswers = (userIdx) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/users/${userIdx}/answers`)
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

export const registUserAnswers = (param) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/users/answers`, param)
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