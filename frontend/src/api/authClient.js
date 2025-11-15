// src/api/authClient.js
import api, { setAccessToken, clearAccessToken } from "./axios";

const REFRESH_TOKEN_KEY = "app_refresh_token";

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
  const res = await api.post("/auth/refresh", { refreshToken: refresh });
  const { accessToken, refreshToken: newRefresh } = res.data;
  setAccessToken(accessToken);
  if (newRefresh) localStorage.setItem(REFRESH_TOKEN_KEY, newRefresh);
  return { accessToken, refreshToken: newRefresh || refresh };
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
