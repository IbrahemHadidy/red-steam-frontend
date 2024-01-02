import { FC, SetStateAction, useState } from "react";
import Slider from "react-slick";
import useResponsiveViewports from "../../../../components/useResponsiveViewports";
import HoverSummary from "../../../../components/HoverSummary/HoverSummary";
import featuredGames from "../featuredGames";

const FeaturedDesktop: FC = () => {
	const isViewport1600  = useResponsiveViewports(1600);
	const [summaryHoverStates, setSummaryHoverStates] = useState<{[key: string]: boolean}>({});
	const [hoveredImage, setHoveredImage] = useState<string | null>(null);

	const handleMouseEnter = (imageUrl: SetStateAction<string | null>) => {
		setHoveredImage(imageUrl);
	};

	const handleMouseLeave = () => {
		setHoveredImage(null);
	};

	const featuredSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		fade: true,
	};

	return (
		<div className="featured-carousel">
			<div className="main-carousel-content">
				<h2 className="home-titles">Featured & Recommended</h2>
				<Slider {...featuredSettings}>
					{featuredGames.map((slide, index) => {
						const positiveCount = slide.reviews.filter(review => review.type === "positive").length;
						const totalReviews = slide.reviews.length;
						const positivePercentage = (positiveCount / totalReviews) * 100;

						return (<div className="slides-container" key={index}>
							<a className="slide"
								href={`/game/${slide.id}`}
								onMouseEnter={() => setSummaryHoverStates(prevState => ({ ...prevState, [slide.id]: true }))}
								onMouseLeave={() => setSummaryHoverStates(prevState => ({ ...prevState, [slide.id]: false }))}
							>
								<div
									className="main-card"
									style={{
										backgroundImage: `url(${hoveredImage || slide.mainImage})`,
										transition: "background-image 0.1s",
									}}
								></div>
								<div className="info-card">
									<div className="app-name">
										<div>{slide.name}</div>
									</div>
									<div className="photos">
										{slide.moviesAndImages.filter(item => item.type === "image" && item.featured).map((img, index) => (
											<div key={index}>
												<div
													onMouseEnter={() => handleMouseEnter(img.link)}
													onMouseLeave={handleMouseLeave}
													style={{backgroundImage: `url(${img.link})`}}
												></div>
											</div>
										))}
									</div>
									<div className="reason">
										<div className={slide.reason}>
											{slide.reason === "available" ? (
												<div>Now Available</div>
											) : (
												<>
													<strong>Recommended</strong> because you liked games
													tagged with
												</>
											)}
										</div>
										<div className="tags">
											{slide.tags.map((tag, index) => (
												<span key={index}>{tag}</span>
											))}
										</div>
									</div>
									{!slide.discount ? (
										<div className="no-discount">
											<div className="price">{!slide.free && "$"}{slide.price} {!slide.free && "USD"}</div>
										</div>
									) : (
										<div className="discount">
											<div className="discount-block">
												<div className="discount-percentage">
													-{slide.discountPercentage}%
												</div>
												<div className="discount-prices">
													<div className="original-price">${slide.price}</div>
													<div className="final-price">
														${slide.discountPrice} USD
													</div>
												</div>
											</div>
										</div>
									)}
									<div className="platform">
										{slide.win && <span className="platform-image win"/>}
										{slide.mac && <span className="platform-image mac"/>}
									</div>
								</div>
							</a>
							{!isViewport1600 && summaryHoverStates[slide.id] && <div>
								<HoverSummary
									title={slide.name}
									date={slide.releaseDate}
									screenshots={slide.moviesAndImages.filter(item => item.type === "image" && item.featured).map(item => item.link)}
									description={slide.description}
									positivePercentage={positivePercentage}
									totalReviews={totalReviews}
									tags={slide.tags}
									leftArrow={!isViewport1600}
								/>
							</div>}
						</div>
					)})}
				</Slider>
			</div>
		</div>
	);
};

export default FeaturedDesktop;
