import React from 'react';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <div
        className="login-left-panel"
        style={{
          minHeight: '100vh',
          background: 'var(--color-deep-navy)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '48px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.3px',
              marginBottom: '20px',
            }}
          >
            TaskDash
          </div>
          <p
            style={{
              fontSize: '26px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 1.35,
              letterSpacing: '-0.4px',
            }}
          >
            Assign work.<br />
            Track progress.<br />
            Get things done.
          </p>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: '100vh',
          background: 'var(--color-app-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
