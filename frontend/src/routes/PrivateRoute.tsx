import React from 'react';
import { JSX } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  return user?.id ? children : <Navigate to="/login" replace />;
}
