# Authentication System Documentation

## Overview
This application now includes a complete authentication system with login functionality and user profile management.

## Features

### 🔐 Authentication
- **Login Page**: Email and password authentication
- **Session Management**: Persistent login state using Zustand
- **Cookie Support**: Backend session cookies are handled automatically
- **Error Handling**: Comprehensive error messages for failed login attempts

### 👤 User Profile
- **Profile Display**: User avatar, name, username, email, and location
- **Dynamic Loading**: Profile data is fetched from the backend API
- **Loading States**: Proper loading and error states
- **Logout Functionality**: Secure logout with session cleanup

### 🎨 Responsive Design
- **Mobile-First**: Optimized for both mobile and desktop
- **Theme Support**: Integrated with existing theme system
- **Clean UI**: Modern card-based design with proper spacing

## API Integration

### Environment Setup
Create a `.env` file with:
```
VITE_BASE_URL=http://localhost:3000
```

### Login Endpoint
- **URL**: `{{base_url}}/api/v1/auth/login`
- **Method**: POST
- **Body**: `{ "email": "user@example.com", "password": "password" }`

#### Success Response (200):
```json
{
    "statusCode": 200,
    "data": "Login Successful",
    "message": {
        "sessionId": "43fbf16e-6b61-4bf5-8b45-acbd13086193"
    },
    "success": true
}
```

#### Error Response (401):
```json
{
    "statusCode": 401,
    "data": "Username or Password Incorrect",
    "message": "Success",
    "success": false
}
```

### User Profile Endpoint
- **URL**: `{{base_url}}/api/v1/user/profile`
- **Method**: GET
- **Authentication**: Session cookie required

#### Expected Response:
```json
{
    "name": "John Doe",
    "username": "@johndoe",
    "email": "john.doe@example.com",
    "location": "New York, USA",
    "avatar": "https://example.com/avatar.jpg" // optional
}
```

## File Structure

```
src/
├── components/
│   ├── Login.tsx              # Login form component
│   └── ui/
│       ├── avatar.tsx         # Avatar component
│       ├── input.tsx          # Input field component
│       └── label.tsx          # Label component
├── lib/
│   └── api.ts                 # API service functions
├── pages/
│   └── Settings.tsx           # Enhanced settings with profile
├── store/
│   └── auth.ts                # Authentication state management
├── App.tsx                    # Main app with auth routing
└── .env                       # Environment variables
```

## Usage

1. **First Time Setup**:
   - User sees the login page
   - Enter valid credentials
   - Upon successful login, user is redirected to the main app

2. **Settings Page**:
   - Profile information is automatically fetched from the backend
   - Display user avatar, name, and details
   - Logout functionality available

3. **Session Persistence**:
   - Login state is preserved across browser sessions
   - Automatic logout on session expiry

## Error Handling

- **Network Errors**: "Network error occurred. Please try again."
- **Invalid Credentials**: Shows the error message from the API response
- **Profile Loading**: Retry button for failed profile loads
- **Session Expiry**: Automatic redirect to login page

## Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173/
```

## Security Features

- **CORS Support**: Credentials included in API requests
- **Session Cookies**: Automatic cookie handling
- **Input Validation**: Required fields and email validation
- **Error Messages**: User-friendly error feedback
- **Secure Logout**: Proper session cleanup
