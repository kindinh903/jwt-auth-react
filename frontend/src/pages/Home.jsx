// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

export default function Home() {
  const auth = useAuth();

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h2>🏠 Welcome to JWT Auth Demo</h2>
      
      <p>
        This is a complete JWT authentication implementation demonstrating:
      </p>

      <ul style={{ marginLeft: "1.5rem", lineHeight: 1.8 }}>
        <li>Secure login with access and refresh tokens</li>
        <li>Automatic token refresh on expiration</li>
        <li>Protected routes requiring authentication</li>
        <li>Axios interceptors for automatic token handling</li>
        <li>React Hook Form for form validation</li>
        <li>React Query for server state management</li>
      </ul>

      <h3 style={{ marginTop: "2rem" }}>🚀 Getting Started</h3>

      {auth.user ? (
        <div>
          <p>
            Welcome back, <strong>{auth.user.name}</strong>! You are currently logged in.
          </p>
          <Link to="/dashboard" style={{ color: "#007bff", textDecoration: "none" }}>
            → Go to Dashboard
          </Link>
        </div>
      ) : (
        <div>
          <p>
            To explore the authentication system, please log in with the following credentials:
          </p>
          <div style={{ 
            backgroundColor: "#f0f0f0", 
            padding: "1rem", 
            borderRadius: "4px", 
            marginBottom: "1rem" 
          }}>
            <strong>Email:</strong> alice@example.com<br />
            <strong>Password:</strong> password
          </div>
          <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
            → Go to Login
          </Link>
        </div>
      )}

      <h3 style={{ marginTop: "2rem" }}>📚 Features</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div style={{ padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
          <h4>✅ Access Tokens</h4>
          <p style={{ fontSize: "0.875rem" }}>
            Short-lived tokens (60s) stored in memory for security
          </p>
        </div>
        
        <div style={{ padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
          <h4>🔄 Refresh Tokens</h4>
          <p style={{ fontSize: "0.875rem" }}>
            Long-lived tokens stored in localStorage for session persistence
          </p>
        </div>

        <div style={{ padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
          <h4>🛡️ Protected Routes</h4>
          <p style={{ fontSize: "0.875rem" }}>
            Dashboard only accessible when authenticated
          </p>
        </div>

        <div style={{ padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "4px" }}>
          <h4>⚡ Automatic Refresh</h4>
          <p style={{ fontSize: "0.875rem" }}>
            Token automatically refreshed before expiration
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: "2rem" }}>🔍 Try It Out</h3>

      <ol style={{ marginLeft: "1.5rem", lineHeight: 1.8 }}>
        <li>Click "Login" in the navigation</li>
        <li>Use the demo credentials provided</li>
        <li>Access the protected Dashboard</li>
        <li>Wait 60+ seconds and refresh to see automatic token refresh</li>
        <li>Logout to clear all tokens</li>
      </ol>

      <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#e3f2fd", borderRadius: "4px" }}>
        <strong>💡 Developer Tip:</strong> Open the browser DevTools (F12) and check the Network tab 
        to see the automatic token refresh requests when your access token expires!
      </div>
    </div>
  );
}
