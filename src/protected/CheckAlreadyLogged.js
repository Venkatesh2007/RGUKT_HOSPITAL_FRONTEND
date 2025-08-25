import React from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const CheckAlreadyLogged = ({ component: Component, ...rest }) => {
  const jwtToken = Cookies.get("jwtToken");

  if (!jwtToken) {
    return <Component {...rest} />;
  }

  const user = jwtDecode(jwtToken);
  return <Navigate to={`/${user.role}`} />;
};

export default CheckAlreadyLogged;
