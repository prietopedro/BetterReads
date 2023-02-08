import axios from 'axios';

const axiosWithCredentials = axios.create({
  baseURL: '/',
  withCredentials: true,
});

export default axiosWithCredentials;
