import { default as React } from 'react';

export interface TerminalTitlebarProps {
    title?: string;
    subtitle?: string;
    className?: string;
    children?: React.ReactNode;
}
export declare function TerminalTitlebar({ title, subtitle, className, children }: TerminalTitlebarProps): import("react/jsx-runtime").JSX.Element;
