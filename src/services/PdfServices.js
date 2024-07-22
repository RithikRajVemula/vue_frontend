import axios from 'axios';

const BASE_URL = 'http://localhost:3200';

export default {
  getPdf(id) {
    return axios.get(`${BASE_URL}/view-pdf/${id}`, {
      responseType: 'blob',
    });
  },
  downloadPdf(id) {
    return axios.get(`${BASE_URL}/download-pdf/${id}`, {
      responseType: 'blob',
    });
  },
};
