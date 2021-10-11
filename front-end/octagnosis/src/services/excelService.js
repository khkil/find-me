import axios from "../utils/axios";

export const downPrivateStatisticsExcel = (userIdx) => {
  axios({
    method: 'GET',
    url: `/api/admin/ground/excel/statistics/users/${userIdx}`,                 
    responseType: 'blob' // 가장 중요함
})    
.then(response =>{       
  console.log(response); 
    const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'test.xlsx');
    document.body.appendChild(link);
    link.click();
}) 


}