import React from 'react';

export type ButtonVariant = 'default' | 'blue' | 'green' | 'yellow' | 'red';

export interface TerminalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

export function TerminalButton({
  variant = 'default',
  loading = false,
  children,
  className = '',
  disabled,
  ...rest
}: TerminalButtonProps) {
  const variantClass = variant !== 'default' ? ` tui-${variant}` : '';
  return (
    <button
      className={`tui-btn${variantClass} ${className}`.trim()}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className="tui-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
