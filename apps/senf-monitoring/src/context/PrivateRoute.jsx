import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./auth";

const PrivateRoute = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
