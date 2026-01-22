// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import MyInfo from "./pages/MyInfo";
import { useAuth } from "./auth/authProvider";

function Navigation() {
  const auth = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Base styles for header and buttons
  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "#ffffffcc",
    backdropFilter: "saturate(180%) blur(6px)",
    borderBottom: "1px solid #e9ecef",
  };

  const containerStyle = {
    margin: "0 auto",
    maxWidth: 1024,
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  };

  const brandStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    color: "#0d6efd",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "1.125rem",
    whiteSpace: "nowrap",
  };

  const linksRowStyle = {
    display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
    alignItems: "center",
  gap: "0.5rem",
  overflowX: "auto",
  overflowY: "hidden",
  WebkitOverflowScrolling: "touch",
  };

  const linkBaseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.45rem 0.9rem",
    borderRadius: 9999,
    border: "1px solid #dee2e6",
    backgroundColor: "#fff",
    color: "#0d6efd",
    textDecoration: "none",
    fontSize: "0.95rem",
    lineHeight: 1,
    whiteSpace: "nowrap",
  flex: "0 0 auto",
  cursor: "pointer",
    transition: "all .15s ease", 
  };

  const linkActiveStyle = {
    backgroundColor: "#0d6efd",
    color: "#fff",
    borderColor: "#0d6efd",
    boxShadow: "0 2px 6px rgba(13,110,253,0.25)",
    fontWeight: 600,
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
          <Link to="/" style={brandStyle}>🔐 JWT Auth</Link>
          <div style={linksRowStyle}>
            <Link to="/" style={{
              ...linkBaseStyle,
              ...(isActive("/") ? linkActiveStyle : {}),
            }}>Home</Link>
            {auth.user ? (
              <>
                <Link to="/dashboard" style={{
                  ...linkBaseStyle,
                  ...(isActive("/dashboard") ? linkActiveStyle : {}),
                }}>Dashboard</Link>
                <Link to="/my-info" style={{
                  ...linkBaseStyle,
                  ...(isActive("/my-info") ? linkActiveStyle : {}),
                }}>My Info</Link>
              </>
            ) : (
              <>
                <Link to="/login" style={{
                  ...linkBaseStyle,
                  ...(isActive("/login") ? linkActiveStyle : {}),
                }}>Login</Link>
                <Link to="/register" style={{
                  ...linkBaseStyle,
                  ...(isActive("/register") ? linkActiveStyle : {}),
                }}>Register</Link>
              </>
            )}
          </div>
        </div>

        {auth.user && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.9rem", color: "#555", whiteSpace: "nowrap" }}>
              Welcome, <strong>{auth.user.name}</strong>
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-info" 
            element={
              <ProtectedRoute>
                <MyInfo />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
