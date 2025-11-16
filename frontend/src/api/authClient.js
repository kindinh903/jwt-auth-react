// src/api/authClient.js
import api, { setAccessToken, clearAccessToken } from "./axios";
import axios from "axios";

const REFRESH_TOKEN_KEY = "refreshToken";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// Create a simple axios instance without interceptors for refresh token calls
// This prevents double refresh calls from axios interceptor + AuthProvider
const apiPlain = axios.create({
  baseURL: API_BASE,
  withCredentials: false,
});

export async function login(credentials) {
  // server returns { accessToken, refreshToken, user }
  const res = await api.post("/auth/login", credentials);
  const { accessToken, refreshToken, user } = res.data;
  // store tokens per requirements
  setAccessToken(accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  return { accessToken, refreshToken, user };
}

export async function refreshToken() {
  const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refresh) throw new Error("No refresh token");
  
  try {
    // Use apiPlain instead of api to avoid interceptor recursion
    const res = await apiPlain.post("/auth/refresh", { refreshToken: refresh });
    const { accessToken, refreshToken: newRefresh } = res.data;
    setAccessToken(accessToken);
    if (newRefresh) localStorage.setItem(REFRESH_TOKEN_KEY, newRefresh);
    return { accessToken, refreshToken: newRefresh || refresh };
  } catch (error) {
    // Ensure we always throw on refresh failure
    console.error("[authClient] Refresh token request failed:", error.response?.data || error.message);
    throw error;
  }
}

export async function logout() {
  const refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
  try {
    await api.post("/auth/logout", { refreshToken: refresh });
  } catch (err) {
    // ignore network errors but continue to clear local tokens
    console.warn("Logout request failed:", err?.message);
  }
  clearAccessToken();
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
