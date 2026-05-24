export type ToastVariant = 'blue' | 'green' | 'yellow' | 'red';
export interface TerminalToastProps {
    variant?: ToastVariant;
    title?: string;
    message: string;
    onClose?: () => void;
    className?: string;
}
export declare function TerminalToast({ variant, title, message, onClose, className, }: TerminalToastProps): import("react/jsx-runtime").JSX.Element;
