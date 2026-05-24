
export type ProgressVariant = 'blue' | 'green' | 'yellow' | 'red';

export interface TerminalProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: ProgressVariant;
  className?: string;
}

export function TerminalProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  variant = 'blue',
  className = '',
}: TerminalProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`tui-progress ${className}`.trim()}>
      {(label || showValue) && (
        <div className="tui-progress__label-row">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        className="tui-progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={`tui-progress__fill tui-progress__fill--${variant}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
