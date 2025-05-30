import React, { JSX } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
export function PublicRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user?.id ? <Navigate to="/dashboard" replace /> : children;
}
