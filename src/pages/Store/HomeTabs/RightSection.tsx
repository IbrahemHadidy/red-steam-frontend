import { FC } from "react";
import { newAndTrending, popularUpcoming, specials, topSellers } from "./homeTabsItems";
import { gamesData } from "../../Game/gameData";

interface RightSectionProps {
	openedTab: string | number;
	hoveredTabIndex: number | null;
}

const getGameDetails = (hoveredTabIndex: number, data: gamesData[]) => {
	
	const game = data[hoveredTabIndex];
	return {
		gameName: game.name,
		reviews: game.reviews,
		tags: game.tags,
		screenshots: game.moviesAndImages.filter(item => item.type === "image" && item.featured).map(item => item.link),
	};
};

const RightSection: FC<RightSectionProps> = ({ openedTab, hoveredTabIndex }) => {
	const tabsData: { [key: string]: gamesData[] } = {
		"New & Trending": newAndTrending,
		"Top Sellers": topSellers,
		"Popular Upcoming": popularUpcoming,
		"Specials": specials,
	};

	const data = tabsData[openedTab];

	const { gameName, reviews, tags, screenshots } = hoveredTabIndex !== null ? getGameDetails(hoveredTabIndex, data) : { gameName: "", reviews: [], tags: [], screenshots: [] };

	const positiveReviews = reviews.filter(
		(review: { type: string; }) => review.type === "positive"
	).length;
	const negativeReviews = reviews.filter(
		(review: { type: string; }) => review.type === "negative"
	).length;
	const totalReviews = positiveReviews + negativeReviews;
	const positivePercentage =
		(positiveReviews / (positiveReviews + negativeReviews)) * 100;

	const reviewSummary =
		positivePercentage >= 90 ? "Overwhelmingly Positive" :
		positivePercentage >= 80 ? "Very Positive" :
		positivePercentage >= 75 ? "Mostly Positive" :
		(positivePercentage > 40 && positivePercentage < 75) ? "Mixed" :
		positivePercentage <= 10 ? "Overwhelmingly Negative" :
		positivePercentage <= 20 ? "Very Negative" :
		positivePercentage <= 40 ? "Mostly Negative" : null;

		function getHoverInfo() {
			const positivePercentage = (positiveReviews / totalReviews) * 100;
		
			return totalReviews === 0 ? "No reviews yet." : (`${Math.round(positivePercentage)}% of the ${totalReviews} user reviews for this game are positive.`);
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
							<span>&nbsp;({(positiveReviews + negativeReviews).toLocaleString()})</span>
							<span className="review-tooltip">
								{getHoverInfo()}
							</span>
						</div>
						<div className="tab-tags">
							{tags.map((tag, index) => (
								<a
									className="tab-tag"
									key={index}
									href=""
								>
									{tag}
								</a>
							))}
						</div>
						<div className="tabs-screenshots">
							{screenshots.map((screenshot, index) => (
								<div
									className="tabs-screenshot"
									style={{backgroundImage: `url(${screenshot})`}}
									key={index}
								></div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default RightSection;
