// src/pages/MyInfo.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/authProvider";
import { getAccessToken } from "../api/axios";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MyInfo() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [hasValidToken, setHasValidToken] = useState(false);

  // Kiểm tra access token hợp lệ bằng cách gọi /user/me
  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setHasValidToken(false);
          setIsValidating(false);
          return;
        }

        // Gọi API để xác thực token
        await api.get("/user/me");
        setHasValidToken(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        setHasValidToken(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  // Nếu không có access token hợp lệ, redirect
  if (!isValidating && !hasValidToken) {
    navigate("/login", { replace: true });
    return null;
  }

  if (isValidating) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <div className="loading">Validating access token...</div>
      </div>
    );
  }

  // Mock user data
  const mockData = {
    profile: {
      bio: "Passionate developer and tech enthusiast",
      joinDate: "2024-01-15",
      location: "Vietnam",
      website: "https://example.com",
      phone: "+84-123-456-789",
    },
    preferences: {
      theme: "dark",
      notifications: true,
      emailFrequency: "daily",
      privateProfile: false,
    },
    statistics: {
      loginCount: 42,
      lastLogin: new Date().toLocaleString(),
      accountStatus: "Active",
      securityLevel: "Medium",
    },
    roles: ["user", "contributor"],
    permissions: ["read", "write", "comment"],
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>👤 My Information</h1>

      {/* User Header Card */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginBottom: "1.5rem" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#007bff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              color: "white",
            }}
          >
            👨‍💼
          </div>
          <div>
            <h2 style={{ margin: "0 0 0.5rem 0" }}>{auth.user?.name}</h2>
            <p style={{ margin: "0", color: "#666", fontSize: "1rem" }}>{auth.user?.email}</p>
            <p style={{ margin: "0.5rem 0 0 0", color: "#999", fontSize: "0.875rem" }}>
              User ID: <code>{auth.user?.id}</code>
            </p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ borderBottom: "2px solid #007bff", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
          📋 Profile Information
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          {Object.entries(mockData.profile).map(([key, value]) => (
            <div key={key}>
              <dt style={{ fontWeight: "bold", color: "#333", marginBottom: "0.25rem" }}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:
              </dt>
              <dd style={{ margin: "0", color: "#666" }}>{value}</dd>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ borderBottom: "2px solid #007bff", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
          ⚙️ Preferences
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          {Object.entries(mockData.preferences).map(([key, value]) => (
            <div key={key}>
              <dt style={{ fontWeight: "bold", color: "#333", marginBottom: "0.25rem" }}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:
              </dt>
              <dd style={{ margin: "0", color: "#666" }}>
                {typeof value === "boolean" ? (value ? "✓ Yes" : "✗ No") : value}
              </dd>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ borderBottom: "2px solid #007bff", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
          📊 Statistics
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          {Object.entries(mockData.statistics).map(([key, value]) => (
            <div key={key}>
              <dt style={{ fontWeight: "bold", color: "#333", marginBottom: "0.25rem" }}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}:
              </dt>
              <dd style={{ margin: "0", color: "#666" }}>{String(value)}</dd>
            </div>
          ))}
        </div>
      </div>

      {/* Roles & Permissions Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ borderBottom: "2px solid #007bff", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
          🔐 Roles & Permissions
        </h3>
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            padding: "1.5rem",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <strong style={{ display: "block", marginBottom: "0.5rem", color: "#333" }}>Roles:</strong>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {mockData.roles.map((role) => (
                <span
                  key={role}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.875rem",
                  }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div>
            <strong style={{ display: "block", marginBottom: "0.5rem", color: "#333" }}>Permissions:</strong>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {mockData.permissions.map((perm) => (
                <span
                  key={perm}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "20px",
                    fontSize: "0.875rem",
                  }}
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div
        style={{
          backgroundColor: "#e7f3ff",
          border: "1px solid #b3d9ff",
          borderRadius: "4px",
          padding: "1rem",
          color: "#004085",
          fontSize: "0.875rem",
        }}
      >
        <strong>ℹ️ Note:</strong> This information is loaded from frontend mock data. In a real application, this would come from your backend API.
      </div>
    </div>
  );
}
