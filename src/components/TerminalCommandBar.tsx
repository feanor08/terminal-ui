import React, { useRef } from 'react';

export interface TerminalCommandBarProps {
  prompt?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function TerminalCommandBar({
  prompt = '$',
  placeholder = 'enter command…',
  value,
  defaultValue = '',
  onChange,
  onSubmit,
  className = '',
  disabled = false,
}: TerminalCommandBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(e.currentTarget.value);
    }
  }

  return (
    <div
      className={`tui-command-bar ${className}`.trim()}
      onClick={() => inputRef.current?.focus()}
    >
      <span className="tui-command-bar__prompt" aria-hidden="true">
        {prompt}
      </span>
      <input
        ref={inputRef}
        className="tui-command-bar__input"
        type="text"
        aria-label="Command input"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKey}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}
