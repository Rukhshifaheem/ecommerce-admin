import { Navigate } from "react-router-dom";

// Utility function to get the token from cookies
const getTokenFromCookie = () => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
};

// Protected route component
const PrivateRoute = ({ children }) => {
  const token = getTokenFromCookie(); // Check for token in cookies

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token exists, render the protected route
  return children;
};

export default PrivateRoute;
