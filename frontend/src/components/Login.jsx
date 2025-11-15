// src/components/Login.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/authProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "alice@example.com",
      password: "password"
    }
  });
  const auth = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await auth.login(data);
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Login failed";
      setErrorMessage(message);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>🔐 Login</h2>
      
      {errorMessage && (
        <div className="alert alert-error">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email"
            placeholder="alice@example.com"
            {...register("email", { 
              required: "Email is required",
              pattern: { 
                value: /^\S+@\S+$/i, 
                message: "Please enter a valid email" 
              } 
            })} 
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            placeholder="Enter your password"
            {...register("password", { 
              required: "Password is required", 
              minLength: { 
                value: 6, 
                message: "Password must be at least 6 characters" 
              } 
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#e3f2fd", borderRadius: "4px", fontSize: "0.875rem" }}>
        <strong>Demo Credentials:</strong>
        <div style={{ marginTop: "0.5rem" }}>
          Email: <code>alice@example.com</code>
          <br />
          Password: <code>password</code>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          Email: <code>bob@example.com</code>
          <br />
          Password: <code>password</code>
        </div>
      </div>
    </div>
  );
}
