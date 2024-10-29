import useRootStore from "../stores";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VITE_BASE_URL,
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
    if (error.response.status === 401 && error.response.data.code === 418) {
      try {
        const { data } = await instance.post("/api/user/reissue");
        const { accessToken } = data.data;
        useRootStore.getState().setAccessToken(accessToken);
        return instance.request(error.config);
      } catch {
        // useRootStore.getState().setLogout();
        console.log("failed reissue");
      }
    }
    console.log("error", error.response.data);
    return Promise.reject(error);
  }
);

export default instance;
