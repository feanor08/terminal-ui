import React, { useState } from 'react';

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

export function TerminalTabs({
  tabs,
  defaultTab,
  activeTab: controlledActive,
  onTabChange,
  className = '',
}: TerminalTabsProps) {
  const [internalActive, setInternalActive] = useState(defaultTab ?? tabs[0]?.id ?? '');
  const active = controlledActive ?? internalActive;

  function handleSelect(id: string) {
    if (!controlledActive) setInternalActive(id);
    onTabChange?.(id);
  }

  const activeContent = tabs.find((t) => t.id === active)?.content;

  return (
    <div className={`tui-tabs ${className}`.trim()}>
      <div className="tui-tabs__bar" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === active}
            aria-controls={`tui-tabpanel-${tab.id}`}
            id={`tui-tab-${tab.id}`}
            className={`tui-tabs__tab${tab.id === active ? ' tui-tabs__tab--active' : ''}`}
            onClick={() => handleSelect(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="tui-tabs__panel"
        role="tabpanel"
        id={`tui-tabpanel-${active}`}
        aria-labelledby={`tui-tab-${active}`}
      >
        {activeContent}
      </div>
    </div>
  );
}
