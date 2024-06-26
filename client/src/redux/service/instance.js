import axios from "axios";
import queryString from "query-string";
const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  //Concat all params with apiKey then toString
  paramsSerializer: (params) => queryString.stringify(params),
});

instance.interceptors.request.use(async function (config) {
  // Do something before request is sent
  return config;
});
instance.interceptors.response.use(
  function (res) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (res && res.data) {
      return res.data;
    }

    return res.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    throw error;
  }
);

export default instance;
