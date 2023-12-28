import { FC } from "react";
import { newAndTrending, popularUpcoming, specials, tabItem, topSellers } from "./homeTabsItems";
import { renderScreenshots } from "./renderScreenshots";

interface RightSectionProps {
	openedTab: string | number;
	hoveredTabIndex: number | null;
}

const getGameDetails = (_openedTab: string, hoveredTabIndex: number, data: tabItem) => {
	
	// @ts-expect-error "any"
	const game = data[hoveredTabIndex];
	return {
		gameName: game?.gameName || "",
		reviews: game?.reviews || { positive: 0, negative: 0 },
	};
};

const RightSection: FC<RightSectionProps> = ({ openedTab, hoveredTabIndex }) => {
	const tabsData = {
		"New & Trending": newAndTrending,
		"Top Sellers": topSellers,
		"Popular Upcoming": popularUpcoming,
		Specials: specials,
	};

	// @ts-expect-error "any"
	const data = tabsData[openedTab] || [];

	const { gameName, reviews } = getGameDetails(openedTab as unknown as string, hoveredTabIndex as unknown as number, data);

	const positivePercentage = (reviews.positive / (reviews.positive + reviews.negative)) * 100;

	const reviewSummary =
		positivePercentage >= 90 ? "Overwhelmingly Positive" :
		positivePercentage >= 80 ? "Very Positive" :
		positivePercentage >= 75 ? "Mostly Positive" :
		(positivePercentage > 40 && positivePercentage < 75) ? "Mixed" :
		positivePercentage <= 10 ? "Overwhelmingly Negative" :
		positivePercentage <= 20 ? "Very Negative" :
		positivePercentage <= 40 ? "Mostly Negative" : null;

		function getHoverInfo(positiveCount: number, totalReviews: number) {
			const positivePercentage = (positiveCount / totalReviews) * 100;
		
			return `${totalReviews === 0 ? "No reviews yet." : Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`;
		}

	return (
		<div className="tab-right">
			<div className="tab-right-content">
				{hoveredTabIndex !== null && (
					<div className="tab-preview">
						<h2>{gameName}</h2>
						<div className="tab-review-summary">
							<div className="review-title">Overall user reviews:</div>
							<span className={`game-review-summary ${
									positivePercentage < 75 && positivePercentage > 40 
										? "mixed" : positivePercentage >= 75
										? "positive" : positivePercentage >= 40
										? "negative" : ""
								}`}>
								{reviewSummary || "N/A"}
							</span>
							<span>&nbsp;({(reviews.positive + reviews.negative).toLocaleString()})</span>
							<span className="review-tooltip">
								{getHoverInfo(
									reviews.positive,
									reviews.positive + reviews.negative
								)}
							</span>
						</div>
						<div className="tab-tags">
							{data.length > 0 &&
								[...Array(5).keys()].map((index) => {
									const tagText = data[hoveredTabIndex][`tag${index + 1}` as keyof tabItem];
									return (
										tagText && (
											<a key={index} href="">
												{tagText}
											</a>
										)
									);
								})}
						</div>
						<div className="tabs-screenshots">{renderScreenshots(openedTab, hoveredTabIndex)}</div>
					</div>
				)}
			</div>
		</div>
	);
};


export default RightSection;
