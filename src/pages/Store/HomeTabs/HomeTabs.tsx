'use client';

// React
import { useState } from 'react';

// Components
import LeftSection from './LeftSection';
import RightSection from './RightSection';

// Styles
import './HomeTabs.scss';

// Types
import type { FC } from 'react';

const HomeTabs: FC = () => {
  // States
  const [openedTab, setOpenedTab] = useState<string | number>('New & Trending');
  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);

  const handleTabClick = (tab: string) => {
    setOpenedTab(tab);
  };

  const handleTabHover = (index: number | null) => {
    setHoveredTabIndex(index);
  };

  return (
    <div className="tab-container">
      <div className="tab-contents">
        <LeftSection
          openedTab={openedTab}
          handleTabClick={handleTabClick}
          hoveredTabIndex={hoveredTabIndex}
          onTabHover={handleTabHover}
        />
        <RightSection openedTab={openedTab} hoveredTabIndex={hoveredTabIndex} />
      </div>
    </div>
  );
};

export default HomeTabs;
