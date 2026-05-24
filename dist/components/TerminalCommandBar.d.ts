export interface TerminalCommandBarProps {
    prompt?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    className?: string;
    disabled?: boolean;
}
export declare function TerminalCommandBar({ prompt, placeholder, value, defaultValue, onChange, onSubmit, className, disabled, }: TerminalCommandBarProps): import("react/jsx-runtime").JSX.Element;
