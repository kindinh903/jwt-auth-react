// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

// Logging utility
function log(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`, data);
}

// Environment variables (in production, use .env)
const ACCESS_SECRET = process.env.ACCESS_SECRET || "hihihehe";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "hihihehe";

// Mock user database
const mockUser = { id: "1", email: "alice@example.com", name: "Alice" };

// Valid test accounts
const validAccounts = [
  { email: "alice@example.com", password: "password", name: "Alice" },
  { email: "bob@example.com", password: "password", name: "Bob" },
];

// In-memory store of valid refresh tokens (in production, use database)
let refreshTokensStore = new Set();

function signAccess(user) {
  // Short-lived access token (60 seconds for demo)
  return jwt.sign({ sub: user.id, email: user.email }, ACCESS_SECRET, { expiresIn: "60s" });
}

function signRefresh(user) {
  // Longer-lived refresh token (7 days)
  return jwt.sign({ sub: user.id, email: user.email }, REFRESH_SECRET, { expiresIn: "7d" });
}

// Middleware to verify access token
function verifyAccessToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    log("WARN", "Token verification failed - no authorization header");
    return res.status(401).json({ message: "No authorization header" });
  }
  
  const parts = auth.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    log("WARN", "Token verification failed - invalid authorization header format");
    return res.status(401).json({ message: "Invalid authorization header format" });
  }
  
  const token = parts[1];
  try {
    const payload = jwt.verify(token, ACCESS_SECRET);
    req.user = payload;
    log("DEBUG", "Token verification successful", { email: payload.email });
    next();
  } catch (err) {
    log("WARN", "Token verification failed - invalid or expired token", { error: err.message });
    return res.status(401).json({ message: "Invalid or expired access token", error: err.message });
  }
}

// Register endpoint
app.post("/auth/register", (req, res) => {
  const { email, password, name } = req.body;
  
  log("INFO", "Register attempt", { email });
  
  // Validate input
  if (!email || !password || !name) {
    log("WARN", "Register failed - missing fields", { email });
    return res.status(400).json({ message: "Email, password, and name are required" });
  }
  
  // Validate password length
  if (password.length < 6) {
    log("WARN", "Register failed - password too short", { email });
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }
  
  // Check if email already exists
  const existingAccount = validAccounts.find((acc) => acc.email === email);
  if (existingAccount) {
    log("WARN", "Register failed - email already exists", { email });
    return res.status(409).json({ message: "Email already registered" });
  }
  
  // Create new account
  const newAccount = { email, password, name };
  validAccounts.push(newAccount);
  
  // Issue tokens
  const user = { id: newAccount.email, email: newAccount.email, name: newAccount.name };
  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user);
  
  // Store refresh token
  refreshTokensStore.add(refreshToken);
  
  log("INFO", "Register successful - new account created and tokens issued", { email: user.email, name: user.name, tokenCount: refreshTokensStore.size });
  
  res.status(201).json({
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

// Login endpoint
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  log("INFO", "Login attempt", { email });
  
  // Validate input
  if (!email || !password) {
    log("WARN", "Login failed - missing credentials", { email });
    return res.status(400).json({ message: "Email and password are required" });
  }
  
  // Find matching account
  const account = validAccounts.find(
    (acc) => acc.email === email && acc.password === password
  );
  
  if (!account) {
    log("WARN", "Login failed - invalid credentials", { email });
    return res.status(401).json({ message: "Invalid credentials" });
  }
  
  // Issue tokens
  const user = { id: account.email, email: account.email, name: account.name };
  const accessToken = signAccess(user);
  const refreshToken = signRefresh(user);
  
  // Store refresh token
  refreshTokensStore.add(refreshToken);
  
  log("INFO", "Login successful - tokens issued", { email: user.email, name: user.name, tokenCount: refreshTokensStore.size });
  
  res.json({
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

// Refresh endpoint
app.post("/auth/refresh", (req, res) => {
  const { refreshToken } = req.body;
  
  log("INFO", "Token refresh attempt");
  
  if (!refreshToken) {
    log("WARN", "1Token refresh failed - no refresh token provided");
    return res.status(400).json({ message: "Refresh token is required" });
  }
  
  if (!refreshTokensStore.has(refreshToken)) {
    log("WARN", "2Token refresh failed - invalid or revoked refresh token");
    return res.status(401).json({ message: "Invalid or revoked refresh token" });
  }
  
  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    
    // Issue new tokens (refresh token rotation)
    const user = { id: payload.sub, email: payload.email };
    const newAccessToken = signAccess(user);
        
    log("INFO", "3Token refresh successful - new tokens issued", { email: user.email, tokenCount: refreshTokensStore.size });
    
    res.json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    refreshTokensStore.delete(refreshToken);
    log("WARN", "4Token refresh failed - token validation error", { error: err.message });
    return res.status(401).json({ message: "Refresh token expired or invalid", error: err.message });
  }
});

// Logout endpoint
app.post("/auth/logout", (req, res) => {
  const { refreshToken } = req.body;
  
  log("INFO", "Logout attempt");
  
  if (refreshToken) {
    refreshTokensStore.delete(refreshToken);
    log("INFO", "Logout successful - refresh token revoked", { tokenCount: refreshTokensStore.size });
  } else {
    log("WARN", "Logout - no refresh token provided");
  }
  
  res.json({ ok: true, message: "Logged out successfully" });
});

// Get current user info (protected)
app.get("/user/me", verifyAccessToken, (req, res) => {
  // Find full user data by email
  const account = validAccounts.find((acc) => acc.email === req.user.email);
  if (!account) {
    log("ERROR", "User info request failed - user not found", { email: req.user.email });
    return res.status(404).json({ message: "User not found" });
  }
  
  log("INFO", "User info retrieved", { email: account.email, name: account.name });
  
  res.json({
    user: {
      id: account.email,
      email: account.email,
      name: account.name,
    },
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  log("WARN", "Endpoint not found", { method: req.method, path: req.path });
  res.status(404).json({ message: "Endpoint not found" });
});

// Error handler
app.use((err, req, res, next) => {
  log("ERROR", "Server error", { error: err.message, stack: err.stack });
  res.status(500).json({ message: "Internal server error", error: err.message });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  log("INFO", "🚀 JWT Auth Backend started", { port: PORT, url: `http://localhost:${PORT}` });
  console.log("\nTest Credentials:");
  console.log("  Email: alice@example.com");
  console.log("  Password: password");
  console.log("\nor");
  console.log("  Email: bob@example.com");
  console.log("  Password: password\n");
});
