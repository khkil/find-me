import axios from "../utils/axios";

axios.interceptors.request.use((config) => {

  console.log('axios interceptor: ', config);
  //
  return config;
});

export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/auth/login', credentials)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const logout = () => {
  localStorage.removeItem('token');
}

export const checkId = (id) => {
  const params = { id: id } ;
  return new Promise((resolve, reject) => {
    axios
      .post('/api/auth/check-id', params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const getAuthInfo = () => {
  const token = localStorage.getItem('token');
  return new Promise((resolve, reject) => {
    axios
      .get('/api/auth/info', {
        headers: {
          Authorization: `${token}`
        }
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function signUp(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/sign-up", credentials)
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

export function resetPassword(credentials) {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/auth/reset-password", credentials)
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
