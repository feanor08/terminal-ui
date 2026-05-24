export type DeltaDirection = 'up' | 'down' | 'flat';
export interface TerminalMetricProps {
    label: string;
    value: string | number;
    delta?: string;
    deltaDirection?: DeltaDirection;
    className?: string;
}
export declare function TerminalMetric({ label, value, delta, deltaDirection, className, }: TerminalMetricProps): import("react/jsx-runtime").JSX.Element;
