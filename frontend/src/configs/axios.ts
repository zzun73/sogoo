import useRootStore from "../stores";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 2500,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const { accessToken } = useRootStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    console.log("성공");
    return response;
  },
  async (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default instance;
