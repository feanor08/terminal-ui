import React from 'react';

export interface TerminalTitlebarProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}

export function TerminalTitlebar({ title, subtitle, className = '', children }: TerminalTitlebarProps) {
  return (
    <div className={`tui-titlebar ${className}`.trim()} role="banner">
      <div className="tui-titlebar__dots" aria-hidden="true">
        <span className="tui-titlebar__dot tui-titlebar__dot--close" />
        <span className="tui-titlebar__dot tui-titlebar__dot--min" />
        <span className="tui-titlebar__dot tui-titlebar__dot--max" />
      </div>
      {title && (
        <div className="tui-titlebar__title">
          {title}
          {subtitle && <span style={{ opacity: 0.5, marginLeft: '8px' }}>{subtitle}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
