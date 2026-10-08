import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, style, onFocus, onBlur, ...rest }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-slate)' }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          style={{
            height: '36px',
            padding: '0 10px',
            border: `1px solid ${error ? 'var(--color-danger)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            color: 'var(--color-ink)',
            background: 'var(--color-surface)',
            outline: 'none',
            transition: 'border-color 0.15s',
            ...style,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error
              ? 'var(--color-danger)'
              : 'var(--color-primary)';
            onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error
              ? 'var(--color-danger)'
              : 'var(--color-border)';
            onBlur?.(e);
          }}
          {...rest}
        />
        {error && (
          <span style={{ fontSize: '12px', color: 'var(--color-danger)' }}>{error}</span>
        )}
        {hint && !error && (
          <span style={{ fontSize: '12px', color: 'var(--color-muted-slate)' }}>{hint}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
