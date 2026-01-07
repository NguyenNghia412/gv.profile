import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://e1api.huce.edu.vn",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use((res) => res.data);

export default axiosClient;
