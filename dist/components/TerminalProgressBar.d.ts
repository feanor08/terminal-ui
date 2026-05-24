export type ProgressVariant = 'blue' | 'green' | 'yellow' | 'red';
export interface TerminalProgressBarProps {
    value: number;
    max?: number;
    label?: string;
    showValue?: boolean;
    variant?: ProgressVariant;
    className?: string;
}
export declare function TerminalProgressBar({ value, max, label, showValue, variant, className, }: TerminalProgressBarProps): import("react/jsx-runtime").JSX.Element;
