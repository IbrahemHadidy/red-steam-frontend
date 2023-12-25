import { FC, useState } from "react";
import { LeftSection } from "./LeftSection";
import RightSection from "./RightSection";
import "./HomeTabs.scss"

const HomeTabs: FC = () => {
	const [openedTab, setOpenedTab] = useState<string | number>("New & Trending");
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
