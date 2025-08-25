import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
  const jwtToken = Cookies.get("jwtToken");

  if (!jwtToken) {
    return <Navigate to="/login" />;
  }

  const user = jwtDecode(jwtToken);

  if (user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
