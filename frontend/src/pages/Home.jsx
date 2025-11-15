// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

export default function Home() {
  const auth = useAuth();

  return (
    <div style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#333", margin: "0 0 0.5rem 0" }}>🏠 Welcome to JWT Auth Demo</h1>
        <p style={{ color: "#666", fontSize: "1.05rem", margin: 0 }}>A complete JWT authentication implementation with secure token management and protected routes</p>
      </div>

      {/* Welcome/CTA Card */}
      {auth.user ? (
        <div style={{
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
              <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.8rem" }}>Welcome back, {auth.user.name}!</h2>
              <Link to="/dashboard" style={{ 
                display: "inline-block", 
                marginTop: "1rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "white",
                color: "#667eea",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "600",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              >
                → Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          color: "white",
          boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div style={{ fontSize: "3rem" }}>🔐</div>
            <div>
              <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.8rem" }}>Get Started Today</h2>
              <p style={{ margin: "0.5rem 0 0 0", opacity: 0.95, fontSize: "1.05rem" }}>Log in to explore the secure authentication system and protected routes.</p>
              <Link to="/login" style={{ 
                display: "inline-block", 
                marginTop: "1rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "white",
                color: "#667eea",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "600",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              >
                → Go to Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Demo Credentials Card */}
      {!auth.user && (
        <div style={{
          backgroundColor: "white",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          padding: "1.5rem",
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        }}>
          <h3 style={{ marginTop: 0, marginBottom: "1rem", color: "#333", fontSize: "1.1rem" }}>📝 Demo Credentials</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ backgroundColor: "#f8f9fa", padding: "1rem", borderRadius: "6px" }}>
              <div style={{ color: "#666", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", textTransform: "uppercase" }}>📧 Email</div>
              <code style={{ display: "block", backgroundColor: "#fff", padding: "0.75rem", borderRadius: "4px", color: "#333", fontSize: "0.95rem", border: "1px solid #dee2e6" }}>
                alice@example.com
              </code>
            </div>
            <div style={{ backgroundColor: "#f8f9fa", padding: "1rem", borderRadius: "6px" }}>
              <div style={{ color: "#666", fontSize: "0.875rem", fontWeight: "600", marginBottom: "0.5rem", textTransform: "uppercase" }}>🔑 Password</div>
              <code style={{ display: "block", backgroundColor: "#fff", padding: "0.75rem", borderRadius: "4px", color: "#333", fontSize: "0.95rem", border: "1px solid #dee2e6" }}>
                password
              </code>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.75rem", color: "#333", marginBottom: "1rem" }}>✨ Key Features</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          <div style={{ backgroundColor: "white", border: "1px solid #dee2e6", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>✅</div>
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Access Tokens</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "0.95rem", lineHeight: 1.5 }}>Short-lived tokens (60s) stored securely in memory to prevent XSS vulnerabilities</p>
          </div>
          <div style={{ backgroundColor: "white", border: "1px solid #dee2e6", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🔄</div>
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Refresh Tokens</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "0.95rem", lineHeight: 1.5 }}>Long-lived tokens stored in localStorage for seamless session persistence</p>
          </div>
          <div style={{ backgroundColor: "white", border: "1px solid #dee2e6", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🛡️</div>
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Protected Routes</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "0.95rem", lineHeight: 1.5 }}>Dashboard and user info pages only accessible to authenticated users</p>
          </div>
          <div style={{ backgroundColor: "white", border: "1px solid #dee2e6", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⚡</div>
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Auto Refresh</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "0.95rem", lineHeight: 1.5 }}>Tokens automatically refreshed before expiration using axios interceptors</p>
          </div>
          <div style={{ backgroundColor: "white", border: "1px solid #dee2e6", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📋</div>
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>Form Validation</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "0.95rem", lineHeight: 1.5 }}>React Hook Form provides robust client-side validation for login forms</p>
          </div>
          <div style={{ backgroundColor: "white", border: "1px solid #dee2e6", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⚙️</div>
            <h4 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>State Management</h4>
            <p style={{ margin: 0, color: "#666", fontSize: "0.95rem", lineHeight: 1.5 }}>React Query manages server state efficiently with caching and sync</p>
          </div>
        </div>
      </div>

      {/* How to Get Started */}
      <div style={{
        backgroundColor: "white",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        padding: "1.5rem",
        marginBottom: "2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}>
        <h3 style={{ marginTop: 0, marginBottom: "1rem", color: "#333", fontSize: "1.1rem" }}>� How to Get Started</h3>
        <ol style={{ margin: "0.5rem 0", paddingLeft: "1.5rem", color: "#666", lineHeight: 1.8 }}>
          <li style={{ marginBottom: "0.5rem" }}>Click the "Get Started" or "Go to Login" button above</li>
          <li style={{ marginBottom: "0.5rem" }}>Use the demo credentials provided to log in</li>
          <li style={{ marginBottom: "0.5rem" }}>You'll receive an access token valid for 60 seconds</li>
          <li style={{ marginBottom: "0.5rem" }}>Explore the Dashboard and My Information pages</li>
          <li>Wait 60+ seconds and refresh to see automatic token refresh in action</li>
        </ol>
      </div>

      {/* Developer Tip */}
      <div style={{
        backgroundColor: "#e3f2fd",
        border: "1px solid #90caf9",
        borderRadius: "8px",
        padding: "1.5rem",
        color: "#1565c0"
      }}>
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#1565c0" }}>💡 Developer Tip</h4>
        <p style={{ margin: "0.5rem 0", lineHeight: 1.6 }}>
          Open your browser DevTools (F12) and navigate to the <strong>Network tab</strong>. You'll see automatic requests to refresh your token when the access token approaches expiration. This demonstrates the seamless token refresh mechanism without interrupting user experience!
        </p>
      </div>
    </div>
  );
}
