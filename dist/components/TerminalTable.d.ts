import { default as React } from 'react';

export interface TerminalTableColumn<T> {
    key: keyof T | string;
    header: string;
    render?: (row: T, index: number) => React.ReactNode;
    align?: 'left' | 'right' | 'center';
}
export interface TerminalTableProps<T extends Record<string, unknown>> {
    columns: TerminalTableColumn<T>[];
    rows: T[];
    getRowKey?: (row: T, index: number) => string | number;
    className?: string;
}
export declare function TerminalTable<T extends Record<string, unknown>>({ columns, rows, getRowKey, className, }: TerminalTableProps<T>): import("react/jsx-runtime").JSX.Element;
