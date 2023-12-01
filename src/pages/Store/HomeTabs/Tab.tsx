import { FC } from "react";

interface TabProps {
  tabName: string;
  tabTitle: string;
  handleTabClick: (tabTitle: string) => void;
  openedTab: string | number;
}

const Tab: FC<TabProps> = ({ tabName, tabTitle, handleTabClick, openedTab }) => (
  <div
    className={`tab-${tabName} ${openedTab === tabTitle ? "active-tab" : ""}`}
    onClick={() => handleTabClick(tabTitle)}
  >
    <div className="tab-content">{tabTitle}</div>
  </div>
);

export default Tab;
