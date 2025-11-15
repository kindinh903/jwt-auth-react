// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { getAccessToken, setAccessToken, clearAccessToken } from "../api/axios";
import Unauthorized from "../pages/Unauthorized";
import { refreshToken as refreshApi } from "../api/authClient";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const token = getAccessToken();
  const [validationResult, setValidationResult] = useState("validating"); // "validating" | "valid" | "unauthorized" | "redirect"

  // Check if user is trying to access without valid tokens
  useEffect(() => {
    const validateAccess = async () => {
      try {
        console.log("[ProtectedRoute] Validating access...");
        console.log("[ProtectedRoute] auth.user:", auth.user);
        console.log("[ProtectedRoute] token:", token);

        // Nếu có access token, cho phép truy cập ngay
        if (auth.user || token) {
          console.log("[ProtectedRoute] Has user or token, allowing access");
          setValidationResult("valid");
          return;
        }

        // Nếu không có access token → cần refresh hoặc hiển thị unauthorized
        const refreshTokenFromStorage = localStorage.getItem("refreshToken");
        console.log("[ProtectedRoute] refreshToken from storage:", refreshTokenFromStorage ? "exists" : "null");
        
        // Không có cả access token và refresh token → UNAUTHORIZED
        if (!refreshTokenFromStorage) {
          console.log("[ProtectedRoute] No refresh token, showing unauthorized screen");
          setValidationResult("unauthorized");
          return;
        }

        // Thử refresh token
        console.log("[ProtectedRoute] Attempting to refresh token...");
        try {
          console.log("[ProtectedRoute] Before calling refreshApi");
          const newTokens = await refreshApi();
          console.log("[ProtectedRoute] After calling refreshApi, result:", newTokens);
          if (newTokens && newTokens.accessToken) {
            // Refresh thành công
            console.log("[ProtectedRoute] Token refresh successful");
            setAccessToken(newTokens.accessToken);
            setValidationResult("valid");
            return;
          }
        } catch (refreshError) {
          console.error("[ProtectedRoute] Refresh token failed with error:");
          console.error("[ProtectedRoute] Error name:", refreshError?.name);
          console.error("[ProtectedRoute] Error message:", refreshError?.message);
          console.error("[ProtectedRoute] Error response status:", refreshError?.response?.status);
          console.error("[ProtectedRoute] Error response data:", refreshError?.response?.data);
          console.error("[ProtectedRoute] Full error:", refreshError);
          // Refresh thất bại → xóa tokens và hiển thị unauthorized
          clearAccessToken();
          localStorage.removeItem("refreshToken");
          console.log("[ProtectedRoute] Tokens cleared, showing unauthorized screen");
          setValidationResult("unauthorized");
          return;
        }
      } catch (error) {
        console.error("[ProtectedRoute] Validation error:", error);
        clearAccessToken();
        localStorage.removeItem("refreshToken");
        // Validation error → unauthorized screen
        setValidationResult("unauthorized");
      }
    };

    validateAccess();
  }, [auth.user, token]);

  console.log("[ProtectedRoute] Current validationResult:", validationResult);

  // Đang kiểm tra
  if (validationResult === "validating") {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <div className="loading">Validating session...</div>
      </div>
    );
  }

  // Nếu access hợp lệ, cho phép truy cập
  if (validationResult === "valid") {
    return children;
  }

  if (validationResult === "unauthorized") {
    console.log("[ProtectedRoute] Rendering Unauthorized screen");
    return <Unauthorized />;
  }

  return <Navigate to="/login" replace />;
}
