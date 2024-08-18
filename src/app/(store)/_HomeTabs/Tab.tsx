'use client';

// Types
import type { FC, JSX } from 'react';
import type { TabProps } from '../Store.types';

const Tab: FC<TabProps> = ({ tabName, tabTitle, handleTabClick, openedTab }): JSX.Element => (
  <div
    className={`tab-${tabName} ${openedTab === tabTitle ? 'active-tab' : ''}`}
    onClick={() => handleTabClick(tabTitle)}
  >
    <div className="tab-content">{tabTitle}</div>
  </div>
);

export default Tab;
