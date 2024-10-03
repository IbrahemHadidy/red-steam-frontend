'use client';

// Types
import type { JSX } from 'react';
import type { TabProps } from '../Store.types';

export default function Tab({
  tabName,
  tabTitle,
  handleTabClick,
  openedTab,
}: TabProps): JSX.Element {
  return (
    <div
      className={`tab-${tabName} ${openedTab === tabTitle ? 'active-tab' : ''}`}
      onClick={() => handleTabClick(tabTitle)}
    >
      <div className="tab-content">{tabTitle}</div>
    </div>
  );
}
