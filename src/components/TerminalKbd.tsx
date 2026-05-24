import React from 'react';

export interface TerminalKbdProps {
  keys: string[];
  separator?: string;
  className?: string;
}

export function TerminalKbd({ keys, separator = '+', className = '' }: TerminalKbdProps) {
  return (
    <span className={`tui-kbd ${className}`.trim()} aria-label={keys.join(` ${separator} `)}>
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="tui-kbd__sep" aria-hidden="true">{separator}</span>}
          <kbd>{key}</kbd>
        </React.Fragment>
      ))}
    </span>
  );
}
