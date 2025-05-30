import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import React from 'react';
import { Spinner } from '../components/Spinner/index.tsx';

interface RouteWrapperProps {
  children: JSX.Element;
  isPrivate?: boolean;
}

export function RouteWrapper({
  children,
  isPrivate = false,
}: RouteWrapperProps) {
  const { user, isLoadingUserStorageData } = useAuth();
  const isAuthenticated = !!user?.id;

  if (isLoadingUserStorageData) {
    return <Spinner />;
  }

  if (!isPrivate && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
