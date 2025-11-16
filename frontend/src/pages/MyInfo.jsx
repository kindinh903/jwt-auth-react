// src/pages/MyInfo.jsx
import React from "react";
import { useAuth } from "../auth/authProvider";

export default function MyInfo() {
  const auth = useAuth();

  // MyInfo được bảo vệ bởi ProtectedRoute, nên auth.user luôn tồn tại ở đây
  // Không cần check isInitializing hay user validation lại

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
    <div style={{ padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#333", margin: "0 0 0.5rem 0" }}>👤 My Information</h1>
        <p style={{ color: "#666", fontSize: "1.05rem", margin: 0 }}>View and manage your personal information and preferences</p>
      </div>

      {/* User Header Card with Gradient */}
      <div
        style={{
          backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          boxShadow: "0 8px 16px rgba(245, 87, 108, 0.3)",
          color: "white"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "3px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3.5rem",
              flexShrink: 0,
            }}
          >
            👨‍💼
          </div>
          <div>
            <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>{auth.user?.name}</h2>
          </div>
        </div>
      </div>
      

      {/* Stats Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ backgroundColor: "white", border: "1px solid #dee2e6", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
          <div style={{ color: "#666", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.25rem" }}>Status</div>
          <div style={{ color: "#28a745", fontSize: "1.1rem", fontWeight: "bold" }}>Active</div>
        </div>
        <div style={{ backgroundColor: "white", border: "1px solid #dee2e6", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔐</div>
          <div style={{ color: "#666", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.25rem" }}>Security Level</div>
          <div style={{ color: "#ffc107", fontSize: "1.1rem", fontWeight: "bold" }}>Medium</div>
        </div>
        <div style={{ backgroundColor: "white", border: "1px solid #dee2e6", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📊</div>
          <div style={{ color: "#666", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.25rem" }}>Login Count</div>
          <div style={{ color: "#007bff", fontSize: "1.1rem", fontWeight: "bold" }}>42</div>
        </div>
      </div>

      {/* Profile Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "#333", fontSize: "1.3rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          📋 Profile Information
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            backgroundColor: "white",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          {Object.entries(mockData.profile).map(([key, value]) => (
            <div key={key} style={{ padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "6px" }}>
              <div style={{ fontWeight: "600", color: "#333", marginBottom: "0.5rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
              </div>
              <div style={{ color: "#666", fontSize: "0.95rem" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div
        style={{
          backgroundColor: "#e3f2fd",
          border: "1px solid #90caf9",
          borderRadius: "8px",
          padding: "1.5rem",
          color: "#1565c0"
        }}
      >
        <strong style={{ fontSize: "1rem", display: "block", marginBottom: "0.5rem" }}>ℹ️ Information</strong>
        <p style={{ margin: "0.5rem 0", lineHeight: "1.6" }}>
          This information is loaded from <strong>frontend mock data</strong>. In a real application, 
          this would come from your backend API. The access token has been validated before displaying this page.
        </p>
      </div>
    </div>
  );
}
