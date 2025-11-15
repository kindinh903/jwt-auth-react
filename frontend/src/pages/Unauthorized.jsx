// src/pages/Unauthorized.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      console.log("Redirecting to login from Unauthorized");
      navigate("/login", { replace: true });
    }, 3000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1;
        console.log(`Countdown: ${newCount}`);
        return newCount;
      });
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          padding: "3rem 2rem",
          textAlign: "center",
          maxWidth: "500px",
          border: "3px solid #dc3545",
        }}
      >
        {/* Icon */}
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "1rem",
          }}
        >
          🔒
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "2rem",
            color: "#dc3545",
            margin: "0 0 0.5rem 0",
          }}
        >
          Unauthorized Access
        </h1>

        {/* Message */}
        <div
          style={{
            backgroundColor: "#ffe5e5",
            border: "1px solid #f5c6c6",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "2rem",
            color: "#721c24",
          }}
        >
          <strong>⏰ Your refresh token has expired</strong>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.95rem" }}>
            Your session has ended. Please log in again to continue.
          </p>
        </div>

        {/* Countdown */}
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "1.5rem",
            borderRadius: "4px",
            marginBottom: "2rem",
          }}
        >
          <p style={{ margin: "0 0 0.5rem 0", color: "#666", fontSize: "0.95rem" }}>
            Redirecting to login in:
          </p>
          <div
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#007bff",
            }}
          >
            {countdown > 0 ? countdown : "0"}s
          </div>
        </div>

        {/* Reason */}
        <div style={{ marginBottom: "2rem", color: "#666", fontSize: "0.9rem" }}>
          <p style={{ margin: "0" }}>
            🔐 For security reasons, refresh tokens expire after 7 days of inactivity.
          </p>
          <p style={{ margin: "0.5rem 0 0 0" }}>
            This is a normal part of the authentication flow.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/login", { replace: true })}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "0.75rem 1.5rem",
            borderRadius: "4px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          👉 Go to Login Now
        </button>
      </div>
    </div>
  );
}
