
export type CardVariant = 'blue' | 'green' | 'yellow' | 'red';

export interface TerminalSelectCardProps {
  variant: CardVariant;
  number: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TerminalSelectCard({
  variant,
  number,
  label,
  selected = false,
  onClick,
  className = '',
}: TerminalSelectCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      className={`tui-select-card tui-${variant}${selected ? ' is-selected' : ''} ${className}`.trim()}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
    >
      <div className="tui-select-card__number">{number}</div>
      <div className="tui-select-card__label">{label}</div>
    </div>
  );
}
