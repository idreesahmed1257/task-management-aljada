import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import { useAuth } from '../features/auth/useAuth';
import Spinner from '../components/ui/Spinner';

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading, logout, admin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)',
        }}
      >
        <Spinner size={32} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar onLogout={logout} adminEmail={admin?.email} />
      <main
        style={{
          flex: 1,
          marginLeft: 'var(--sidebar-width)',
          background: 'var(--color-app-bg)',
          minHeight: '100vh',
          overflowX: 'hidden',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: 'var(--page-padding)',
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
