// src/components/Dashboard.jsx
import React from "react";
import { useAuth } from "../auth/authProvider";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Dashboard được bảo vệ bởi ProtectedRoute, nên auth.user luôn tồn tại ở đây
  // Không cần gọi API /user/me riêng, chỉ sử dụng auth.user từ AuthProvider
  const userData = auth.user;

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login", { replace: true });
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#333", margin: "0 0 0.5rem 0" }}>📊 Dashboard</h1>
        <p style={{ color: "#666", fontSize: "1.05rem", margin: 0 }}>Welcome back! Here's your user information.</p>
      </div>

      {/* Welcome Card */}
      <div style={{
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "12px",
        padding: "2rem",
        marginBottom: "2rem",
        color: "white",
        boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ fontSize: "3rem" }}>👋</div>
          <div>
            <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.8rem" }}>Welcome, {userData?.name}!</h2>
          </div>
        </div>
      </div>

      {/* User Info Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        {/* User ID Card */}
        <div style={{
          backgroundColor: "white",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        }}>
          <div style={{ color: "#666", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", textTransform: "uppercase" }}>
            🔑 User ID
          </div>
          <code style={{ 
            display: "block",
            backgroundColor: "#f8f9fa",
            padding: "0.75rem",
            borderRadius: "4px",
            color: "#333",
            fontSize: "0.95rem",
            wordBreak: "break-all"
          }}>
            {userData?.id}
          </code>
        </div>

        {/* Email Card */}
        <div style={{
          backgroundColor: "white",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        }}>
          <div style={{ color: "#666", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", textTransform: "uppercase" }}>
            📧 Email
          </div>
          <code style={{ 
            display: "block",
            backgroundColor: "#f8f9fa",
            padding: "0.75rem",
            borderRadius: "4px",
            color: "#333",
            fontSize: "0.95rem"
          }}>
            {userData?.email}
          </code>
        </div>

        {/* Full Name Card */}
        <div style={{
          backgroundColor: "white",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        }}>
          <div style={{ color: "#666", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", textTransform: "uppercase" }}>
            👤 Full Name
          </div>
          <div style={{ 
            backgroundColor: "#f8f9fa",
            padding: "0.75rem",
            borderRadius: "4px",
            color: "#333",
            fontSize: "0.95rem"
          }}>
            {userData?.name}
          </div>
        </div>

        {/* Status Card */}
        <div style={{
          backgroundColor: "white",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "1.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        }}>
          <div style={{ color: "#666", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", textTransform: "uppercase" }}>
            ✅ Status
          </div>
          <div style={{ 
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "0.75rem",
            borderRadius: "4px",
            fontSize: "0.95rem",
            fontWeight: "500"
          }}>
            Authenticated
          </div>
        </div>
      </div>

      {/* Full Response */}
      <div style={{
        backgroundColor: "white",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        padding: "1.5rem",
        marginBottom: "2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "1rem", color: "#333", fontSize: "1.1rem" }}>📋 User Data</h3>
        <pre style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #dee2e6",
          borderRadius: "4px",
          padding: "1rem",
          overflow: "auto",
          fontSize: "0.85rem",
          maxHeight: "300px",
          color: "#333"
        }}>
          {JSON.stringify(userData, null, 2)}
        </pre>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button 
          onClick={handleLogout}
          style={{
            flex: 1,
            padding: "1rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 2px 8px rgba(220, 53, 69, 0.2)"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#c82333";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(220, 53, 69, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#dc3545";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 8px rgba(220, 53, 69, 0.2)";
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Info Tips */}
      <div style={{
        backgroundColor: "#e3f2fd",
        border: "1px solid #90caf9",
        borderRadius: "8px",
        padding: "1.5rem",
        color: "#1565c0"
      }}>
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#1565c0" }}>💡 Tips & Information</h4>
        <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem", color: "#1565c0" }}>
          <li style={{ marginBottom: "0.5rem" }}>Your <strong>access token expires in 60 seconds</strong> for demo purposes</li>
          <li style={{ marginBottom: "0.5rem" }}>Try refreshing this page after 60 seconds to see <strong>automatic token refresh</strong> in action</li>
          <li style={{ marginBottom: "0.5rem" }}>Open <strong>DevTools (F12)</strong> → Network tab to see the refresh requests</li>
          <li>Your <strong>refresh token is valid for 7 days</strong> and is stored securely in localStorage</li>
        </ul>
      </div>
    </div>
  );
}
