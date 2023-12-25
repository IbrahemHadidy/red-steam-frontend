import { FC, useEffect, useState } from "react";
import { gamesData, ReviewEntry } from "../gameData";
import DOMPurify from "dompurify";
import useResponsiveViewports from "../../../components/useResponsiveViewports";
import "./GameReviews.scss";


const GameReviews: FC<{ game: gamesData }> = ({ game }) => {
	const isViewport960 = useResponsiveViewports(960);
	const isViewport630 = useResponsiveViewports(630);
	const [selectedFilter, setSelectedFilter] = useState<string>("All");
	const [isPartial, setIsPartial] = useState<boolean>(false);

	let positivePercentage: number = 0;

	function getReviewSummary(positiveCount: number, _negativeCount: number, totalReviews: number) {
		positivePercentage = (positiveCount / totalReviews) * 100;

		if (positivePercentage >= 90) return "Overwhelmingly Positive";
		if (positivePercentage >= 80) return "Very Positive";
		if (positivePercentage >= 75) return "Mostly Positive";
		if (positivePercentage > 40 && positivePercentage < 75) return "Mixed";
		if (positivePercentage <= 10) return "Overwhelmingly Negative";
		if (positivePercentage <= 20) return "Very Negative";
		if (positivePercentage <= 40) return "Mostly Negative";
	}

	const totalReviews = game.reviews.length;
	const positiveReviews = game.reviews.filter((review: ReviewEntry) => review.type === "positive").length;
	const negativeReviews = game.reviews.filter((review: ReviewEntry) => review.type === "negative").length;

	const summary = getReviewSummary(positiveReviews, negativeReviews, totalReviews);
	
	const filterReviews = () => {
		const filteredReviews = game.reviews.filter((review: ReviewEntry) => {
			if (selectedFilter === "All") {
				return true;
			} else if (selectedFilter === "Positive") {
				return review.type === "positive";
			} else if (selectedFilter === "Negative") {
				return review.type === "negative";
			}
			return true;
		});

		return filteredReviews;
	};

	const filteredReviews = filterReviews();
	const totalFilteredReviews = filterReviews().length;

	useEffect(() => {
		if (game.reviews.length > 0) {
			const firstReviewContentLines = game.reviews[0].content.split(/<br\s*\/?>/).filter(line => line.trim() !== '');
			setIsPartial(firstReviewContentLines.length >= (isViewport960 ? 6 : 12));
		}
	}, [game.reviews, isViewport960]);
	
	return (
		<div className="reviews-content">
			<div className="page-content">
				<h2 className="user-reviews-header">Customer reviews</h2>
				<div className="overall-summary-container">
					<div className="overall-summary">
						<div className="overall-section">
						<div className="title">Overall Reviews:</div>
						<span className={`game-review-summary ${
									positivePercentage < 75 && positivePercentage > 40
										? "mixed"
										: positivePercentage >= 75
										? "positive"
										: positivePercentage >= 40
										? "negative"
										: ""
								}`}>{summary || "N/A"} </span>
								<span>({totalReviews.toLocaleString()} reviews)</span>
						</div>
					</div>
				</div>
				<div className="filter-options">
					<div className="review-type">
						<span className="title">Review Type:</span>
						<select 
							id="review-type"
							value={selectedFilter}
							onChange={(e) => setSelectedFilter(e.target.value)}>
							<option value="All">All</option>
							<option value="Positive">Positive</option>
							<option value="Negative">Negative</option>
						</select>
					</div>
				</div>
				<div className="reviews-info">
					<div className="reviews-filter-score">
						<span>Showing <b>{totalFilteredReviews}</b> reviews that match the filters above</span>
						{" ( "}<span className={`game-review-summary ${
									positivePercentage < 75 && positivePercentage > 40
										? "mixed"
										: positivePercentage >= 75
										? "positive"
										: positivePercentage >= 40
										? "negative"
										: ""
								}`}>{summary || "N/A"} </span>{" ) "}
					</div>
				</div>
				<div className="reviews-summary">
					<div className="reviews-sub-header">{`${selectedFilter} User Reviews`}</div>
					{filteredReviews.map((review, index)=> (
						<div className={`review-box ${isPartial ? "partial" : ''}`} key={index}>
							<div className="leftcol">
								<div className="avatar">
									{/* TODO: userId backend logic */}
									<a href={`/id/${{/*userId*/}}`}>
										{/* TODO: isOnline backend logic */}
										<div className={`player-avatar ${{/*isOnline ? "online" : "offline"*/}}`}>
											{/* TODO: profile pic backend logic */}
											<img src="https://source.unsplash.com/user/c_v_r" alt="pfp" />
										</div>
									</a> 
								</div>
								<div className="person-name">
									<a href={`/id/${{/*userId*/}}`}>{review.user}</a>
								</div>
								{isViewport630 && <div className="post-date"> Posted: {review.date}</div>}
							</div>
							<div className="rightcol">
								<div className="vote-header">
									<div className="thumb">
										<img src={`/images/${review.type}.png`} alt={review.type} />
									</div>
									<img className="review-source" src="/images/icon_review_steam.png" />
									<div className="title">{review.type === "negative" ? "Not Recommended" : "Recommended"}</div>
								</div>
								{!isViewport630 && <div className="post-date"> Posted: {review.date}</div>}
								<div className="content">
									<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(review.content)}}/>
									{isPartial ? (<div className="gradient" />) : ''}
								</div>
								{isPartial && <div className="posted">
									<div className="view-more">
										<a onClick={() => setIsPartial((prevIsPartial) => !prevIsPartial)}>Read More</a>
									</div> &nbsp; 
									<div className="hr"></div>
								</div>}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default GameReviews;
