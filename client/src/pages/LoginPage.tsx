import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm';

export default function LoginPage() {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/dashboard" replace />;
  return <LoginForm />;
}
