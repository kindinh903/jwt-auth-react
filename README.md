"# JWT Authentication with React - Full Implementation

A complete, production-ready JWT authentication system built with React, featuring access tokens, refresh tokens, protected routes, and Axios interceptors for automatic token refresh.

## 🎯 Overview

This project demonstrates a secure authentication flow using:
- **JWT (JSON Web Tokens)** for stateless authentication
- **Access Tokens** (short-lived, in-memory storage)
- **Refresh Tokens** (long-lived, localStorage storage)
- **React Query** for server state management
- **React Hook Form** for form validation
- **Axios** with interceptors for automatic token refresh
- **Protected Routes** for access control

## ✨ Features

### Authentication & Authorization
- ✅ User login with email/password
- ✅ Automatic token refresh on expiration
- ✅ Secure logout with token invalidation
- ✅ Protected routes with automatic redirect to login
- ✅ Session persistence across page reloads
- ✅ Automatic logout on refresh token expiration

### Token Management
- ✅ Access tokens stored in-memory (cleared on refresh)
- ✅ Refresh tokens stored in localStorage (persistent)
- ✅ Automatic token refresh with request queueing
- ✅ Token rotation on refresh for security
- ✅ Clean token invalidation on logout

### Form & Validation
- ✅ React Hook Form integration for login form
- ✅ Email and password validation
- ✅ Real-time error display
- ✅ Loading states during submission

### Data Fetching
- ✅ React Query integration for API calls
- ✅ Automatic query invalidation on auth state change
- ✅ Retry logic for failed requests
- ✅ Request/response caching

### Error Handling
- ✅ Meaningful error messages
- ✅ Automatic logout on 401 Unauthorized
- ✅ Network error handling
- ✅ Graceful token expiration handling

## 🏗️ Project Structure

```
jwt-auth-react/
├── frontend/                     # React application
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js         # Axios instance with interceptors
│   │   │   └── authClient.js    # Authentication API methods
│   │   ├── auth/
│   │   │   ├── authProvider.jsx # Auth context provider
│   │   │   └── useAuth.js       # Custom hook for auth
│   │   ├── components/
│   │   │   ├── Login.jsx        # Login form component
│   │   │   ├── Dashboard.jsx    # Protected dashboard
│   │   │   └── ProtectedRoute.jsx # Protected route wrapper
│   │   ├── pages/
│   │   │   └── Home.jsx         # Public home page
│   │   ├── App.jsx              # Main app with routing
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── vite.config.ts           # Vite configuration
│   ├── package.json             # Frontend dependencies
│   ├── .env.example             # Environment variables template
│   └── .env.production.example  # Production env template
│
├── backend/                      # Express authentication server
│   ├── server.js                # Main server with auth endpoints
│   ├── auth.js                  # Auth utilities (optional)
│   ├── package.json             # Backend dependencies
│   └── .env.example             # Environment variables template
│
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16+ and npm v8+
- Git (for cloning)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/kindinh903/jwt-auth-react.git
cd jwt-auth-react
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file (optional, uses defaults)
cp .env.example .env

# Start the server
npm start
# or for development with auto-reload:
npm run dev
```

The backend will start at `http://localhost:4000`

**Test Credentials:**
- Email: `alice@example.com`
- Password: `password`

Or:
- Email: `bob@example.com`
- Password: `password`

#### 3. Setup Frontend

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend will open at `http://localhost:3000`

## 📖 Usage Guide

### 1. Login
1. Navigate to the **Login** page
2. Enter credentials:
   - Email: `alice@example.com`
   - Password: `password`
3. Click **Login**

### 2. Access Protected Dashboard
After login, you can access the **Dashboard** which shows your user information.

### 3. Token Refresh Demo
- Access tokens expire in **60 seconds** (configurable in backend)
- If you wait past 60 seconds and make an API call, the refresh token automatically fetches a new access token
- This happens transparently via Axios interceptors

### 4. Logout
Click the **Logout** button to:
- Clear access token from memory
- Remove refresh token from localStorage
- Redirect to login page

## 🔐 Authentication Flow

```
┌─────────────────────────────────────────────────┐
│  1. User Logs In (email + password)             │
│     POST /auth/login                            │
└─────────────────────┬───────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  2. Server Returns Tokens                       │
│     {                                           │
│       accessToken: "short-lived JWT",          │
│       refreshToken: "long-lived JWT",          │
│       user: { id, email, name }                │
│     }                                           │
└─────────────────────┬───────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  3. Frontend Storage                            │
│     - accessToken → in-memory (lost on refresh)│
│     - refreshToken → localStorage (persisted)  │
│     - user → React state                       │
└─────────────────────┬───────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  4. Protected API Requests                      │
│     Headers: { Authorization: Bearer <token> } │
└─────────────────────┬───────────────────────────┘
                      ↓
        ┌─────────────┴─────────────┐
        ↓                           ↓
    ✅ Valid              ❌ 401 Unauthorized
    │                     │
    └─ Use response       └─ Axios interceptor
                             triggers token refresh
                             │
                             ↓
                      POST /auth/refresh
                      {
                        refreshToken: "stored token"
                      }
                             │
                             ↓
                      ┌──────────────────┐
                      │ Check if valid   │
                      └────────┬─────────┘
                               │
                    ┌──────────┴──────────┐
                    ↓                     ↓
                ✅ Valid           ❌ Expired
                │                  │
                ├─ New tokens      └─ Logout user
                ├─ Retry request      Redirect to
                └─ Complete           login page
                   operation
```

## 🛠️ Key Components

### 1. **Axios Configuration** (`src/api/axios.js`)

```javascript
- In-memory access token storage
- Request interceptor: Attaches access token to every request
- Response interceptor: Handles 401 and triggers token refresh
- Request queueing: Prevents multiple simultaneous refresh calls
```

### 2. **Auth Client** (`src/api/authClient.js`)

```javascript
- login(credentials): Send credentials, store tokens
- refreshToken(): Use stored refresh token to get new access token
- logout(): Clear all tokens and notify server
```

### 3. **Auth Provider** (`src/auth/authProvider.jsx`)

```javascript
- React Context for global auth state
- useMutation for login/logout with React Query
- useEffect to restore session on app load
- Provides useAuth hook for components
```

### 4. **Protected Route** (`src/components/ProtectedRoute.jsx`)

```javascript
- Checks if user is authenticated (via token or user state)
- Redirects to login if not authenticated
- Prevents access to protected pages
```

## 📡 API Endpoints

### Authentication

#### `POST /auth/login`
Login with email and password

**Request:**
```json
{
  "email": "alice@example.com",
  "password": "password"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "alice@example.com",
    "email": "alice@example.com",
    "name": "Alice"
  }
}
```

#### `POST /auth/refresh`
Get new access token using refresh token

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

#### `POST /auth/logout`
Invalidate refresh token on server

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

#### `GET /user/me`
Get current user info (protected - requires access token)

**Headers:**
```
Authorization: Bearer eyJhbGc...
```

**Response (200):**
```json
{
  "user": {
    "id": "alice@example.com",
    "email": "alice@example.com",
    "name": "Alice"
  }
}
```

## 📦 Build & Deployment

### Frontend Deployment

The frontend can be deployed to various platforms:

#### Netlify
```bash
# Build for production
npm run build

# Files to deploy: dist/ folder
# Environment: Set VITE_API_BASE in Netlify dashboard
```

#### Vercel
```bash
# Vercel handles build automatically
# Environment: Create .env.production with VITE_API_BASE
```

#### GitHub Pages
```bash
# Build and deploy
npm run build
# Deploy dist/ to GitHub Pages
```

#### Self-hosted
```bash
npm run build
# Serve dist/ folder with your web server
```

### Backend Deployment

#### Heroku
```bash
heroku create your-app-name
git push heroku main
```

#### Railway
```bash
railway link
railway up
```

#### DigitalOcean App Platform
- Connect your GitHub repo
- Set environment variables
- Deploy

#### Self-hosted
```bash
npm install --production
npm start
```

## 🔧 Configuration

### Frontend Configuration

Edit `frontend/.env.local`:
```env
# Local development
VITE_API_BASE=http://localhost:4000

# Production
VITE_API_BASE=https://your-api.com
```

### Backend Configuration

Edit `backend/.env`:
```env
PORT=4000
ACCESS_SECRET=your_access_secret_change_in_production
REFRESH_SECRET=your_refresh_secret_change_in_production
NODE_ENV=production
```

### Token Lifetimes

In `backend/server.js`, modify `signAccess()` and `signRefresh()`:
```javascript
// Change token expiration times
signAccess(user) {
  return jwt.sign({...}, ACCESS_SECRET, { expiresIn: "15m" }); // 15 minutes
}

signRefresh(user) {
  return jwt.sign({...}, REFRESH_SECRET, { expiresIn: "30d" }); // 30 days
}
```

## 🧪 Testing

### Manual Testing

1. **Login Flow:**
   - Visit http://localhost:3000/login
   - Enter credentials and click Login
   - Should redirect to dashboard

2. **Token Refresh:**
   - Login and wait 60+ seconds
   - Try navigating to different pages
   - New token should be fetched automatically (check Network tab)

3. **Protected Routes:**
   - Try accessing `/dashboard` without logging in
   - Should redirect to `/login`

4. **Logout:**
   - Login successfully
   - Click Logout button
   - Should redirect to login
   - Refresh token should be cleared

### Browser DevTools

1. **Application Tab:**
   - Check localStorage for `app_refresh_token`
   - Should be empty after logout

2. **Network Tab:**
   - After token expires, watch for `/auth/refresh` POST request
   - New access token should be received
   - Original request should retry with new token

3. **Console:**
   - Check for any axios errors or warnings
   - Verify React Query operations

## 🐛 Troubleshooting

### "Cannot find module" errors
**Solution:** Run `npm install` in both frontend and backend directories

### CORS errors
**Solution:** Ensure backend `VITE_API_BASE` in frontend .env.local matches backend URL
```env
VITE_API_BASE=http://localhost:4000  # for local
# or
VITE_API_BASE=https://your-backend.com  # for production
```

### 401 Unauthorized on protected routes
**Solution:** 
- Ensure you're logged in
- Check that refresh token exists in localStorage
- Check browser console for axios errors
- Verify backend is running

### Token not refreshing
**Solution:**
- Check network tab in DevTools
- Verify access token is actually expired
- Check browser console for errors
- Ensure refreshToken endpoint is working: `curl -X POST http://localhost:4000/auth/refresh -H "Content-Type: application/json" -d '{"refreshToken":"your_token"}'`

### Dashboard shows "Error loading user"
**Solution:**
- Logout and login again
- Ensure backend `/user/me` endpoint is working
- Check that access token is valid

## 📚 Technology Stack

### Frontend
- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **React Query 5** - Server state management
- **React Hook Form** - Form validation
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling

### Backend
- **Express 4** - Web framework
- **JWT (jsonwebtoken)** - Token generation
- **CORS** - Cross-origin requests
- **Node.js** - JavaScript runtime

## 🔒 Security Considerations

### ✅ Implemented
- Short-lived access tokens (60 seconds)
- Refresh token rotation
- In-memory access token storage (not in localStorage)
- Automatic logout on refresh token expiration
- CORS protection
- Request/response interceptor for token handling

### ⚠️ Production Recommendations
1. **Use HTTPS** - Always use HTTPS in production
2. **Secure Secrets** - Store JWT secrets in environment variables
3. **Database Integration** - Store refresh tokens in database instead of memory
4. **Rate Limiting** - Add rate limiting to login endpoint
5. **HTTPS Only** - Set secure flag on cookies/tokens
6. **CSRF Protection** - Implement CSRF tokens if using cookies
7. **Input Validation** - Validate all inputs server-side
8. **Logging** - Log authentication attempts and failures
9. **Token Expiration** - Adjust token lifetimes based on security requirements
10. **CORS** - Restrict CORS to specific origins in production

## 📄 License

This project is provided as-is for educational purposes.

## 👨‍💻 Author

**Kin Dinh** - kindinh903

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest improvements
- Submit pull requests

## 📞 Support

If you encounter issues:
1. Check the Troubleshooting section
2. Review browser console for errors
3. Check network requests in DevTools
4. Ensure both frontend and backend are running

## 🔗 Live Demo

*(Add your deployed URLs here after deployment)*

- Frontend: `https://jwt-auth-frontend.netlify.app` (example)
- Backend: `https://jwt-auth-backend.herokuapp.com` (example)

---

**Happy coding! 🚀**" 
