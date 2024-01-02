import { FC, useState } from "react";
import Slider from "react-slick";
import useResponsiveViewports from "../../../components/useResponsiveViewports";
import popularVRGames from "./popularVRGames";
import { gamesData } from "../../Game/gameData";
import HoverSummary from "../../../components/HoverSummary/HoverSummary";

const PopularVR: FC = () => {
	const isViewport960 = useResponsiveViewports(960);
	const [gameHoverStates, setGameHoverStates] = useState<{[key: string]: boolean}>({});

	const vrGamesSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		fade: true,
	};

	const renderGameItem = (game: gamesData, index: number) => {
		const positiveCount = game.reviews.filter(review => review.type === "positive").length;
		const totalReviews = game.reviews.length;
		const positivePercentage = (positiveCount / totalReviews) * 100;
		return (
			<div className="mini-item-container" key={index}>
				<a 
					className="mini-item" 
					href={`/game/${game.id}`}
					onMouseEnter={() => setGameHoverStates(prevState => ({ ...prevState, [game.id]: true }))}
					onMouseLeave={() => setGameHoverStates(prevState => ({ ...prevState, [game.id]: false }))}
				>
					<div className="mini-capsule">
						<img src={game.smallHeaderImage} alt={game.name} />
					</div>
					<div className="mini-price">
						<div className={game.discount?"discount":"no-discount"}>
							<div className="price">
								{!game.discount ? (
									`${!game.free?"$":""}${game.price}`
								) : (
									<div className="mini-discount-block">
										<div className="discount-percentage">
											-{game.discountPercentage}%
										</div>
										<div className="discount-prices">
											<div className="original-price">${game.price}</div>
											<div className="final-price">${game.discountPrice}</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</a>
				{!isViewport960 && gameHoverStates[game.id] && <div>
						<HoverSummary
							title={game.name}
							date={game.releaseDate}
							screenshots={game.moviesAndImages.filter(item => item.type === "image" && item.featured).map(item => item.link)}
							description={game.description}
							positivePercentage={positivePercentage}
							totalReviews={totalReviews}
							tags={game.tags}
							leftArrow={!isViewport960}
							rightArrow={!isViewport960}
						/>
				</div>}
			</div>
		)
	};

	const renderCategorySlide = (start: number, end: number) => {
		const categoryGames = popularVRGames.slice(start, end);
		return categoryGames.map((game, index) => (
			renderGameItem(game, index)
		));
	};

	const renderAllCategories = () => {
		const categorySlides = [];

		const slides = Math.floor(popularVRGames.length / 4);
		for (let i = 0; i < slides; i++) {
			const start = i * 4;
			const end = start + 4;
			categorySlides.push(renderCategorySlide(start, end));
		}
		return categorySlides;
	};

	return (
		<div className="home-section">
			<div className="home-contents">
				<h2 className="main-btn-title">
					POPULAR VR GAMES
					<span className="right-btn">
						<a className="view-more" href="/search?tags=VR">
							{isViewport960 ? (
								<div className="mobile-more">
									<div className="mobile-more-dive">
										More{" "}
										<img src="/images/ResponsiveChevron.svg" className="dive" />
									</div>
								</div>
							) : (
								<span>BROWSE ALL</span>
							)}
						</a>
					</span>
				</h2>
				{isViewport960 ? (
					<div className="mobile-mini mini">
						{renderAllCategories()}
					</div>
				) : (
					<div className="mini-slides mini">
						<Slider {...vrGamesSettings}>
							{renderAllCategories().map((categorySlide, index) => (
								<div className="mini-row" key={index}>
									{categorySlide}
								</div>
							))}
						</Slider>
					</div>
				)}
			</div>
		</div>
	);
};

export default PopularVR;
