// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { getAccessToken } from "../api/axios";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const token = getAccessToken();
  // If we have user state OR an access token in memory, allow.
  if (auth.user || token) {
    return children;
  }
  return <Navigate to="/login" replace />;
}
