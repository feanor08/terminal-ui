export type CardVariant = 'blue' | 'green' | 'yellow' | 'red';
export interface TerminalSelectCardProps {
    variant: CardVariant;
    number: string;
    label: string;
    selected?: boolean;
    onClick?: () => void;
    className?: string;
}
export declare function TerminalSelectCard({ variant, number, label, selected, onClick, className, }: TerminalSelectCardProps): import("react/jsx-runtime").JSX.Element;
