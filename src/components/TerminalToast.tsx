
export type ToastVariant = 'blue' | 'green' | 'yellow' | 'red';

const ICONS: Record<ToastVariant, string> = {
  blue:   '↗',
  green:  '✓',
  yellow: '!',
  red:    '!',
};

export interface TerminalToastProps {
  variant?: ToastVariant;
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export function TerminalToast({
  variant = 'blue',
  title,
  message,
  onClose,
  className = '',
}: TerminalToastProps) {
  return (
    <div
      className={`tui-toast tui-${variant} ${className}`.trim()}
      role="alert"
      aria-live="polite"
    >
      <span className="tui-toast__icon" aria-hidden="true">{ICONS[variant]}</span>
      <div className="tui-toast__body">
        {title && <strong className="tui-toast__title">{title}</strong>}
        <span className="tui-toast__message">{message}</span>
      </div>
      {onClose && (
        <button className="tui-toast__close" onClick={onClose} aria-label="Dismiss">
          ×
        </button>
      )}
    </div>
  );
}
