import { default as React } from 'react';

export interface TerminalTab {
    id: string;
    label: string;
    content: React.ReactNode;
}
export interface TerminalTabsProps {
    tabs: TerminalTab[];
    defaultTab?: string;
    activeTab?: string;
    onTabChange?: (id: string) => void;
    className?: string;
}
export declare function TerminalTabs({ tabs, defaultTab, activeTab: controlledActive, onTabChange, className, }: TerminalTabsProps): import("react/jsx-runtime").JSX.Element;
