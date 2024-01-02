import { FC } from "react";
import featuredGames from "../featuredGames";

const FeaturedMobile: FC = () => {
	return (
		<div className="featured-carousel">
			<div className="main-carousel-content">
				<h2 className="home-titles">Featured & Recommended</h2>
				<div className="mobile-carousel">
					{featuredGames.map((slide, index) => (
						<a key={index} className="mobile-capsule" href={`/game/${slide.id}`}>
							<div
								className="mobile-capsule-content"
								style={{ backgroundImage: `url(${slide.mainImage})` }}
							></div>
							<div className="info-card">
								<div className="app-name">
									<div>{slide.name}</div>
								</div>
								{!slide.discount ? (
									<div className="no-discount">
										<div className="price">${slide.price}</div>
									</div>
								) : (
									<div className="discount">
										<div className="price">
											<div className="discount-block">
												<div className="discount-percentage">
													-{slide.discountPercentage}%
												</div>
												<div className="discount-prices">
													<div className="original-price">${slide.price}</div>
													<div className="final-price">
														${slide.discountPrice}
													</div>
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
					))}
				</div>
			</div>
		</div>
	);
};

export default FeaturedMobile;
