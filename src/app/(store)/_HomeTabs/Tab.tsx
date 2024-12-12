// Enums
import { OpenedTab } from '@enums/tabs';

interface TabProps {
  tabName: string;
  tabTitle: OpenedTab;
  handleTabClick: (tabTitle: OpenedTab) => void;
  openedTab: OpenedTab;
}

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
