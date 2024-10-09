import axios from "axios";

export const serverApiUrl =
  process.env.NODE_ENV === "development"
    ? "https://shen-basic.shenlearn.tv/api/e-learning"
    : `${window.location.origin}/api/e-learning`;
export const xDomain =
  process.env.NODE_ENV === "development" ? "shen-basic" : window.location.hostname.split(".").shift();

export const axiosInstance = axios.create({
  baseURL: serverApiUrl,
});

export const clientAxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

clientAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log("where is my token?", token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
