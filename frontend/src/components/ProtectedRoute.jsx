// src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../auth/authProvider";
import Unauthorized from "../pages/Unauthorized";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();

  // Chờ AuthProvider initialize xong
  if (auth.isInitializing) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <div className="loading">Initializing...</div>
      </div>
    );
  }

  // Nếu có user, cho phép truy cập
  if (auth.user) {
    return children;
  }

  // Nếu không có user sau khi initialize, hiển thị unauthorized
  return <Unauthorized />;
}
