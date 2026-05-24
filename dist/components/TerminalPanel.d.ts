import { default as React } from 'react';

export type PanelVariant = 'default' | 'blue' | 'green' | 'yellow' | 'red';
export interface TerminalPanelProps {
    title?: string;
    variant?: PanelVariant;
    headerRight?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}
export declare function TerminalPanel({ title, variant, headerRight, children, className, }: TerminalPanelProps): import("react/jsx-runtime").JSX.Element;
