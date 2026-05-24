import React from 'react';

export type StatusVariant = 'blue' | 'green' | 'yellow' | 'red' | 'muted';

export interface TerminalStatusTagProps {
  variant?: StatusVariant;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function TerminalStatusTag({
  variant = 'muted',
  dot = false,
  children,
  className = '',
}: TerminalStatusTagProps) {
  const variantClass = variant !== 'muted' ? ` tui-${variant}` : '';
  return (
    <span className={`tui-status-tag${variantClass} ${className}`.trim()}>
      {dot && <span className="tui-status-tag__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
