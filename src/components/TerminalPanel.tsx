import React from 'react';

export type PanelVariant = 'default' | 'blue' | 'green' | 'yellow' | 'red';

export interface TerminalPanelProps {
  title?: string;
  variant?: PanelVariant;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function TerminalPanel({
  title,
  variant = 'default',
  headerRight,
  children,
  className = '',
}: TerminalPanelProps) {
  const variantClass = variant !== 'default' ? ` tui-${variant}` : '';
  return (
    <div className={`tui-panel${variantClass} ${className}`.trim()}>
      {(title || headerRight) && (
        <div className="tui-panel__header">
          {title && <h2 className="tui-panel__title">{title}</h2>}
          {headerRight}
        </div>
      )}
      {children}
    </div>
  );
}
