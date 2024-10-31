'use client';

// Types
import type { OpenedTab } from '../Store.types';

interface TabProps {
  tabName: string;
  tabTitle: string;
  handleTabClick: (tabTitle: OpenedTab) => void;
  openedTab: OpenedTab;
}

export default function Tab({ tabName, tabTitle, handleTabClick, openedTab }: TabProps) {
  return (
    <div
      className={`tab-${tabName} ${openedTab === tabTitle ? 'active-tab' : ''}`}
      onClick={() => handleTabClick(tabTitle as OpenedTab)}
    >
      <div className="tab-content">{tabTitle}</div>
    </div>
  );
}
