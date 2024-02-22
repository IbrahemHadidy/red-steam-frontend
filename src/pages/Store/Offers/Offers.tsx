import { FC, useState } from "react";
import useResponsiveViewports from "hooks/useResponsiveViewports";
import { offeredGames, specialOffers } from "./OfferedGames";
import Slider from "react-slick";
import "./Offers.scss";
import { gamesData } from "services/gameData";
import HoverSummary from "components/HoverSummary/HoverSummary";

const Offers: FC = () => {
	const isViewport960 = useResponsiveViewports(960);
	const [offerHoverStates, setOfferHoverStates] = useState<{[key: string]: boolean}>({});

	const offersSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		fade: true,
	};

	const renderOfferDiv = (offer: gamesData, index: number) => {
		const positiveCount = offer.reviews.filter(review => review.type === "positive").length;
		const totalReviews = offer.reviews.length;
		const positivePercentage = (positiveCount / totalReviews) * 100;

		return (
			<div className="offer-result-container big"
				key={`offer-${index}`}
				onMouseEnter={() => setOfferHoverStates(prevState => ({ ...prevState, [offer.id]: true }))}
				onMouseLeave={() => setOfferHoverStates(prevState => ({ ...prevState, [offer.id]: false }))}
			>
				<div className="offer-bg">
					<div className="spotlight-img">
						<a href={`/game/${offer.id}`}>
							<img src={offer.verticalHeaderImage} alt={offer.name} />
						</a>
					</div>
					<div className="spotlight-content">
						<h2>{offer.offerType}</h2>
						<div className="spotlight-body">Offer ends {offer.offerEndDate}</div>
						<div className="spotlight-body spotlight-price price">
							<div className="discount-block-offers">
								<div className="discount-Percentage-offers">
									-{offer.discountPercentage}%
								</div>
								<div className="discount-prices-offers">
									<div className="original-price-offers">
										${offer.price}
									</div>
									<div className="final-price-offers">${offer.discountPrice}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{!isViewport960 && offerHoverStates[offer.id] && <div>
					<HoverSummary
						title={offer.name}
						date={offer.releaseDate}
						screenshots={offer.moviesAndImages.filter(item => item.type === "image" && item.featured).map(item => item.link)}
						description={offer.description}
						positivePercentage={positivePercentage}
						totalReviews={totalReviews}
						tags={offer.tags}
						leftArrow={!isViewport960}
						rightArrow={!isViewport960}
					/>
				</div>}
			</div>
		)
	};

	const renderSmallGroupDiv = (offer: gamesData, index: number) => {
		const positiveCount = offer.reviews.filter(review => review.type === "positive").length;
		const totalReviews = offer.reviews.length;
		const positivePercentage = (positiveCount / totalReviews) * 100;
		
		return (
			<div className="offer-result-container small" key={`special-${index}`}>
				<div 
					className="specials" 
					onMouseEnter={() => setOfferHoverStates(prevState => ({ ...prevState, [offer.id]: true }))}
					onMouseLeave={() => setOfferHoverStates(prevState => ({ ...prevState, [offer.id]: false }))}
				>
					<a className="special-capsule" href={`/game/${offer.id}`}>
						<div className="header-capsule">
							<img src={offer.horizontalHeaderImage} alt={offer.name} />
						</div>
						<div>
							<div className="discount-block-offers">
								<div className="discount-Percentage-offers">
									-{offer.discountPercentage}%
								</div>
								<div className="discount-prices-offers">
									<div className="original-price-offers">
										${offer.price}
									</div>
									<div className="final-price-offers">${offer.discountPrice}</div>
								</div>
							</div>
						</div>
					</a>
				</div>
				{!isViewport960 && offerHoverStates[offer.id] && <div>
					<HoverSummary
						title={offer.name}
						date={offer.releaseDate}
						screenshots={offer.moviesAndImages.filter(item => item.type === "image" && item.featured).map(item => item.link)}
						description={offer.description}
						positivePercentage={positivePercentage}
						totalReviews={totalReviews}
						tags={offer.tags}
						leftArrow={!isViewport960}
						rightArrow={!isViewport960}
					/>
				</div>}
			</div>
		)
	};

	const renderOffers = (offers: gamesData[]) => (
		offers.map((offer, index) => (
			renderOfferDiv(offer, index)
		))
	);

	const renderSmallGroups = (specialOffers: gamesData[]) => (
		<div className="small-group">
			{specialOffers.map((specialOffer, index) => (
				renderSmallGroupDiv(specialOffer, index) 
			))}
		</div>
	);


	//---- Change the structure of the slides from here and change the data structure if needed ----//
	const renderSlides = () => {

		function renderGroup(start: number) {
			const end = Math.min(start + 2, specialOffers.length);
			return renderSmallGroups(specialOffers.slice(start, end));
		}
		function renderOffer(start: number) {
			const end = Math.min(start + 1, offeredGames.length);
			return renderOffers(offeredGames.slice(start, end));
		}

		// Customized for 4 slides only (Every JSX Fragment is a slide) change if needed
		const configurations = [
			{
				bigOffers: 0,
				slides: [
					<>{renderGroup(0)}{renderGroup(2)}{renderGroup(4)}</>,
					<>{renderGroup(6)}{renderGroup(8)}{renderGroup(10)}</>,
					<>{renderGroup(12)}{renderGroup(14)}{renderGroup(16)}</>,
					<>{renderGroup(18)}{renderGroup(20)}{renderGroup(22)}</>,
				]
			},
			{
				bigOffers: 1,
				slides: [
					<>{renderOffer(0)}{renderGroup(0)}{renderGroup(2)}</>,
					<>{renderGroup(4)}{renderGroup(6)}{renderGroup(8)}</>,
					<>{renderGroup(10)}{renderGroup(12)}{renderGroup(14)}</>,
					<>{renderGroup(16)}{renderGroup(18)}{renderGroup(20)}</>,
				]
			},
			{
				bigOffers: 2,
				slides: [
					<>{renderOffer(0)}{renderOffer(1)}{renderGroup(0)}</>,
					<>{renderGroup(2)}{renderGroup(4)}{renderGroup(6)}</>,
					<>{renderGroup(8)}{renderGroup(10)}{renderGroup(12)}</>,
					<>{renderGroup(14)}{renderGroup(16)}{renderGroup(18)}</>,
				]
			},
			{
				bigOffers: 3,
				slides: [
					<>{renderOffer(0)}{renderOffer(1)}{renderGroup(0)}</>,
					<>{renderOffer(2)}{renderGroup(2)}{renderGroup(4)}</>,
					<>{renderGroup(6)}{renderGroup(8)}{renderGroup(10)}</>,
					<>{renderGroup(12)}{renderGroup(14)}{renderGroup(16)}</>,
				]
			},
			{
				bigOffers: 4,
				slides: [
					<>{renderOffer(0)}{renderOffer(1)}{renderGroup(0)}</>,
					<>{renderOffer(2)}{renderOffer(3)}{renderGroup(2)}</>,
					<>{renderGroup(4)}{renderGroup(6)}{renderGroup(8)}</>,
					<>{renderGroup(10)}{renderGroup(12)}{renderGroup(14)}</>,
				]
			},
			{
				bigOffers: 5,
				slides: [
					<>{renderOffer(0)}{renderOffer(1)}{renderGroup(0)}</>,
					<>{renderOffer(2)}{renderOffer(3)}{renderGroup(2)}</>,
					<>{renderOffer(4)}{renderGroup(4)}{renderGroup(6)}</>,
					<>{renderGroup(8)}{renderGroup(10)}{renderGroup(12)}</>,
				]
			},
			{
				bigOffers: 6,
				slides: [
					<>{renderOffer(0)}{renderOffer(1)}{renderGroup(0)}</>,
					<>{renderOffer(2)}{renderOffer(3)}{renderGroup(2)}</>,
					<>{renderOffer(4)}{renderOffer(5)}{renderGroup(4)}</>,
					<>{renderGroup(6)}{renderGroup(8)}{renderGroup(10)}</>,
				]
			},
			{
				bigOffers: 7,
				slides: [
					<>{renderOffer(0)}{renderOffer(1)}{renderGroup(0)}</>,
					<>{renderOffer(2)}{renderOffer(3)}{renderGroup(2)}</>,
					<>{renderOffer(4)}{renderOffer(5)}{renderGroup(4)}</>,
					<>{renderOffer(6)}{renderGroup(6)}{renderGroup(8)}</>,
				]
			},
			{
				bigOffers: 8,
				slides: [
					<>{renderOffer(0)}{renderOffer(1)}{renderGroup(0)}</>,
					<>{renderOffer(2)}{renderOffer(3)}{renderGroup(2)}</>,
					<>{renderOffer(4)}{renderOffer(5)}{renderGroup(4)}</>,
					<>{renderOffer(6)}{renderOffer(7)}{renderGroup(6)}</>,
				]
			}
		];
		
		let slides: JSX.Element[] = [];
		
		for (const config of configurations) {
			if (offeredGames.length <= config.bigOffers) {
				slides = config.slides;
				break;
			}
		}
		
		if (!slides) {
			slides = [];
		}
	
		return slides.map((slide, index) => (
			<div className="offers-row" key={`slide-${index}`}>
				{slide}
			</div>
		));
	};

	return (
		<div className="home-section">
			<div className="home-contents">
				<h2 className="main-btn-title">
					Special Offers
					<span className="right-btn">
						<a className="view-more" href="/search?priceOptions=Special%20Offers">

							{/* Render different button on mobile */}
							{isViewport960 ? (
								<div className="mobile-more">
									<div className="mobile-more-dive">
										More{" "}
										<img
											src="/images/ResponsiveChevron.svg"
											className="dive"
										/>
									</div>
								</div>
							) : (
								<span>Browse More</span>
							)}
						</a>
					</span>
				</h2>
				<div className="offers-slides">
					<div className="offers-items">
						{isViewport960 ? (

							// Mobile Component
							<div className="mobile-offers">
								{renderSlides()}
							</div>
						) : (

							// Desktop Component
							<Slider {...offersSettings}>
								{renderSlides().map((slide, index) => (
									<div className="offers-row" key={index}>
										{slide}
									</div>
								))}
							</Slider>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Offers;
