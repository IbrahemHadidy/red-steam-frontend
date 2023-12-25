import { newAndTrending, popularUpcoming, specials, topSellers } from "./homeTabsItems";

const getImageURL = (
		openedTab: string | number | never,
		hoveredTabIndex: string | number,
		imageNumber: number
	) => {
		const tabs = {
			"New & Trending": newAndTrending,
			"Top Sellers": topSellers,
			"Popular Upcoming": popularUpcoming,
			"Specials": specials,
		};
		//@ts-expect-error "any type error"
		const currentTab = tabs[openedTab] || [];
		return currentTab[hoveredTabIndex]?.[`image${imageNumber}`] || "";
	};

export const renderScreenshots = (
		openedTab: string | number,
		hoveredTabIndex: number
	) => {
		return [...Array(4).keys()].map((index) => (
			<div
				className="tabs-screenshot"
				style={{
					backgroundImage: `url(${getImageURL(
						openedTab,
						hoveredTabIndex,
						index + 1
					)})`,
				}}
				key={index}
			></div>
		));
	};