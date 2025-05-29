import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import React from "react";

interface RouteWrapperProps {
  children: JSX.Element;
  isPrivate?: boolean;
}

export function RouteWrapper({
  children,
  isPrivate = false,
}: RouteWrapperProps) {
  const { user } = useAuth();
  const isAuthenticated = !!user?.id;

  if (!isPrivate && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
