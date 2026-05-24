import React from 'react';

export interface TerminalShellProps {
  children?: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light';
}

export function TerminalShell({ children, className = '', theme = 'dark' }: TerminalShellProps) {
  const themeClass = theme === 'light' ? 'tui-light' : '';
  return (
    <div className={`tui-shell ${themeClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
