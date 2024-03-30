import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

axiosIns.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosIns;
