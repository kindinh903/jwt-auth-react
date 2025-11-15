// src/api/axios.js
import axios from "axios";
import { refreshToken } from "./authClient";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

// in-memory access token
let inMemoryAccessToken = null;

// helpers to get/set access token
export const setAccessToken = (token) => {
  inMemoryAccessToken = token;
};
export const getAccessToken = () => inMemoryAccessToken;
export const clearAccessToken = () => { inMemoryAccessToken = null; };

// Add Authorization header to every request if access token exists
api.interceptors.request.use((config) => {
  const token = inMemoryAccessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh handling: single refresh in progress + queue
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(cb) {
  refreshSubscribers.push(cb);
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) return Promise.reject(error);

    // only handle 401 for protected endpoints (but NOT /auth/refresh itself)
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      // mark retry so we don't loop
      originalRequest._retry = true;

      if (isRefreshing) {
        // queue the request until refresh finishes
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((token) => {
            if (!token) {
              reject(error);
            } else {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            }
          });
        });
      }

      isRefreshing = true;
      try {
        const newTokens = await refreshToken(); // calls /auth/refresh using refresh token from localStorage
        if (newTokens && newTokens.accessToken) {
          console.log("Access token: ", newTokens.accessToken);
          setAccessToken(newTokens.accessToken);
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          onRefreshed(newTokens.accessToken);
          return api(originalRequest);
        } else {
          onRefreshed(null);
          return Promise.reject(error);
        }
      } catch (refreshError) {
        onRefreshed(null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
