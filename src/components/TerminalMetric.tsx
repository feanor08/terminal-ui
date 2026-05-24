
export type DeltaDirection = 'up' | 'down' | 'flat';

export interface TerminalMetricProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaDirection?: DeltaDirection;
  className?: string;
}

const DELTA_PREFIX: Record<DeltaDirection, string> = {
  up: '▲ ',
  down: '▼ ',
  flat: '— ',
};

export function TerminalMetric({
  label,
  value,
  delta,
  deltaDirection = 'flat',
  className = '',
}: TerminalMetricProps) {
  return (
    <div className={`tui-metric ${className}`.trim()}>
      <div className="tui-metric__label">{label}</div>
      <div className="tui-metric__value">{value}</div>
      {delta !== undefined && (
        <div className={`tui-metric__delta tui-metric__delta--${deltaDirection}`}>
          {DELTA_PREFIX[deltaDirection]}{delta}
        </div>
      )}
    </div>
  );
}
