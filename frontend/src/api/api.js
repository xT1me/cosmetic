import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3002";

const getToken = () => Cookies.get("accessToken");
const getRefreshToken = () => Cookies.get("refreshToken");

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
    async (config) => {
      const token = getToken();

  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      const refreshToken = getRefreshToken();
  
      if (token && isTokenExpired(token) && refreshToken) {
        try {
          const refreshedTokens = await refreshTokenFunction(refreshToken);
  
          config.headers.Authorization = `Bearer ${refreshedTokens.accessToken}`;
        } catch (error) {
          console.error("Token refresh failed", error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return Date.now() >= payload.exp * 1000;
};

const refreshTokenFunction = async (refreshToken) => {
  const response = await api.post("/auth/refresh", { refreshToken });
  return response.data;
};

export default api;
