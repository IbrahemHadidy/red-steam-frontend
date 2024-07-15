'use client';

// Types
import type { FC } from 'react';
import type { TabProps } from '../Store.types';

const Tab: FC<TabProps> = ({ tabName, tabTitle, handleTabClick, openedTab }) => (
  <div
    className={`tab-${tabName} ${openedTab === tabTitle ? 'active-tab' : ''}`}
    onClick={() => handleTabClick(tabTitle)}
  >
    <div className="tab-content">{tabTitle}</div>
  </div>
);

export default Tab;
