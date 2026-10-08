import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CheckSquare, LogOut } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  adminEmail?: string;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/employees', label: 'Employees', icon: Users },
  { to: '/tasks', label: 'Tasks', icon: CheckSquare },
];

export default function Sidebar({ onLogout, adminEmail }: SidebarProps) {
  return (
    <aside
      style={{
        width: 'var(--sidebar-width)',
        minHeight: '100vh',
        background: 'var(--color-deep-navy)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          padding: '20px 16px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.3px',
          }}
        >
          TaskDash
        </span>
      </div>

      <nav style={{ flex: 1, padding: '12px 8px' }}>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '9px 12px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '2px',
              fontSize: '13.5px',
              fontWeight: 500,
              textDecoration: 'none',
              color: isActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
              background: isActive ? 'rgba(26,107,69,0.18)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
              transition: 'background 0.15s, color 0.15s',
            })}
          >
            <Icon size={16} strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div
        style={{
          padding: '12px 8px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {adminEmail && (
          <div
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '4px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {adminEmail}
          </div>
        )}
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '9px 12px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: 'transparent',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '13.5px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(198,61,79,0.15)';
            e.currentTarget.style.color = '#e87a87';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
