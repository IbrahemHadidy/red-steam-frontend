'use client';

// Types
import type { TabProps } from '../Store.types';

export default function Tab({ tabName, tabTitle, handleTabClick, openedTab }: TabProps) {
  return (
    <div
      className={`tab-${tabName} ${openedTab === tabTitle ? 'active-tab' : ''}`}
      onClick={() => handleTabClick(tabTitle)}
    >
      <div className="tab-content">{tabTitle}</div>
    </div>
  );
}
