import { default as React } from 'react';

export interface TerminalShellProps {
    children?: React.ReactNode;
    className?: string;
    theme?: 'dark' | 'light';
}
export declare function TerminalShell({ children, className, theme }: TerminalShellProps): import("react/jsx-runtime").JSX.Element;
