import React, { useContext } from "react";
import { useAuthContext } from "senf-shared";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
