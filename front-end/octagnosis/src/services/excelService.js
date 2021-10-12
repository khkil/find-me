import axios from "../utils/axios";

export const downExcel = (response) => {
  const fileName = decodeURIComponent(response.headers["file_name"]);
  const blob = new Blob([response.data], { type: response.headers['content-type'] });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
}

export const downPrivateStatisticsExcel = (userIdx) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `/api/admin/ground/excel/statistics/users/${userIdx}`,                 
      responseType: 'blob'
    })    
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