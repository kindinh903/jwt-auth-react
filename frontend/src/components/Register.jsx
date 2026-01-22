// src/components/Register.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/authProvider";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: ""
    }
  });
  const auth = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      await auth.register({
        email: data.email,
        password: data.password,
        name: data.name
      });
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Registration failed";
      setErrorMessage(message);
      console.error("Register error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>📝 Register</h2>
      
      {errorMessage && (
        <div className="alert alert-error">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input 
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name", { 
              required: "Full name is required",
              minLength: { 
                value: 2, 
                message: "Name must be at least 2 characters" 
              }
            })} 
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email"
            placeholder="john@example.com"
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            id="confirmPassword"
            type="password" 
            placeholder="Confirm your password"
            {...register("confirmPassword", { 
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match"
            })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}
