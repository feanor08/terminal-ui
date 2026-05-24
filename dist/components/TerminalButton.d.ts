import { default as React } from 'react';

export type ButtonVariant = 'default' | 'blue' | 'green' | 'yellow' | 'red';
export interface TerminalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    loading?: boolean;
    children: React.ReactNode;
}
export declare function TerminalButton({ variant, loading, children, className, disabled, ...rest }: TerminalButtonProps): import("react/jsx-runtime").JSX.Element;
