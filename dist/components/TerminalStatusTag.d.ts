import { default as React } from 'react';

export type StatusVariant = 'blue' | 'green' | 'yellow' | 'red' | 'muted';
export interface TerminalStatusTagProps {
    variant?: StatusVariant;
    dot?: boolean;
    children: React.ReactNode;
    className?: string;
}
export declare function TerminalStatusTag({ variant, dot, children, className, }: TerminalStatusTagProps): import("react/jsx-runtime").JSX.Element;
