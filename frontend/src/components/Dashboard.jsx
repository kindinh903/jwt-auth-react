// src/components/Dashboard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuth } from "../auth/authProvider";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const auth = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const r = await api.get("/user/me");
      return r.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login", { replace: true });
    }
  };

  const handleRefreshUser = async () => {
    await refetch();
  };

  if (isLoading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <div className="loading">Loading user information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
        <div className="error">
          <strong>Error loading user information:</strong> {error.message}
        </div>
        <button onClick={handleRefreshUser} style={{ marginTop: "1rem" }}>
          Try Again
        </button>
        <button onClick={handleLogout} className="danger" style={{ marginLeft: "0.5rem" }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h2>📊 Dashboard</h2>
      
      <div className="user-card">
        <h3>Welcome, {data?.user?.name}! 👋</h3>
        
        <div className="user-info">
          <dt>User ID</dt>
          <dd><code>{data?.user?.id}</code></dd>
          
          <dt>Email</dt>
          <dd><code>{data?.user?.email}</code></dd>
          
          <dt>Name</dt>
          <dd>{data?.user?.name}</dd>
        </div>

        <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "4px", fontSize: "0.875rem" }}>
          <strong>Full Response:</strong>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>

      <div className="flex">
        <button onClick={handleRefreshUser} className="success">
          🔄 Refresh User Info
        </button>
        <button onClick={handleLogout} className="danger">
          🚪 Logout
        </button>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#fff3cd", borderRadius: "4px", fontSize: "0.875rem" }}>
        <strong>💡 Tip:</strong> Your access token expires in 60 seconds. Try refreshing after the token expires to see automatic token refresh in action!
      </div>
    </div>
  );
}
