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
    console.log(response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error);
    if (
      error.response?.status === 401 &&
      error.response?.data == "access token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const reissue = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/member/reissue`,
          {},
          {
            withCredentials: true,
          }
        );
        const token = reissue.headers["authorization"].split(" ")[1];
        const { setAccessToken } = useRootStore.getState();
        setAccessToken(token);
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return instance(originalRequest);
      } catch (err) {
        console.log("reissue error 발생 : ", err);
      }
    }
    console.log("error : ", error);
    return Promise.reject(error);
  }
);

export default instance;
