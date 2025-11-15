// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { useAuth } from "./auth/authProvider";

function Navigation() {
  const auth = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "style" : "";

  return (
    <nav style={{ 
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      borderBottom: "1px solid #dee2e6",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <Link to="/" style={{ 
          fontSize: "1.25rem", 
          fontWeight: "bold",
          color: "#007bff",
          textDecoration: "none"
        }}>
          🔐 JWT Auth
        </Link>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/" style={{ 
            color: "#007bff",
            textDecoration: "none",
            fontWeight: location.pathname === "/" ? "bold" : "normal"
          }}>
            Home
          </Link>
          {auth.user && (
            <Link to="/dashboard" style={{ 
              color: "#007bff",
              textDecoration: "none",
              fontWeight: location.pathname === "/dashboard" ? "bold" : "normal"
            }}>
              Dashboard
            </Link>
          )}
          {!auth.user && (
            <Link to="/login" style={{ 
              color: "#007bff",
              textDecoration: "none",
              fontWeight: location.pathname === "/login" ? "bold" : "normal"
            }}>
              Login
            </Link>
          )}
        </div>
      </div>

      {auth.user && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.875rem", color: "#666" }}>
            Welcome, <strong>{auth.user.name}</strong>
          </span>
        </div>
      )}
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
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
