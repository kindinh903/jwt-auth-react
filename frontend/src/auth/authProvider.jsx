// src/auth/authProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, logout as logoutApi, refreshToken as refreshApi } from "../api/authClient";
import { setAccessToken, clearAccessToken } from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const queryClient = useQueryClient();

  // attempt to refresh on app load if refresh token exists
  useEffect(() => {
    const attemptRefresh = async () => {
      console.log("[AuthProvider] Starting initialization...");
      try {
        const tokens = await refreshApi();
        console.log("[AuthProvider] Refresh successful:", tokens?.accessToken ? "✓" : "✗");
        if (tokens && tokens.accessToken) {
          setAccessToken(tokens.accessToken);
          // optionally fetch user info
          const me = await fetch(`${import.meta.env.VITE_API_BASE || "http://localhost:4000"}/user/me`, {
            headers: { Authorization: `Bearer ${tokens.accessToken}` },
          }).then((r) => r.json());
          const userData = me.user || null;
          setUser(userData);
          // Pre-populate React Query cache for "me" query
          queryClient.setQueryData(["me"], me);
          console.log("[AuthProvider] User set:", userData?.name);
        }
      } catch (e) {
        // no valid session
        console.log("[AuthProvider] Refresh failed, clearing tokens:", e?.message);
        clearAccessToken();
        setUser(null);
      } finally {
        console.log("[AuthProvider] Initialization complete");
        setIsInitializing(false);
      }
    };
    attemptRefresh();
  }, [queryClient]);

  const loginMutation = useMutation({
    mutationFn: (creds) => loginApi(creds),
    onSuccess: (data) => {
      setUser(data.user);
      // invalidate queries that need auth
      queryClient.invalidateQueries(["me"]);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
    },
  });

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login: loginMutation.mutateAsync,
      logout: logoutMutation.mutateAsync,
      isLoggingIn: loginMutation.isLoading,
      isInitializing,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
