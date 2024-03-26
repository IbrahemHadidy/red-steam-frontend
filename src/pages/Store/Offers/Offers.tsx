import { FC, useState } from "react";
import useSoftNavigate from 'hooks/useSoftNavigate';
import Slider from 'react-slick';
import useResponsiveViewport from "hooks/useResponsiveViewport";
import { offeredGames, specialOffers } from 'services/OfferedGames';
import HoverSummary from 'components/HoverSummary/HoverSummary';
import { gamesData } from 'services/gameData';
import "./Offers.scss";

const Offers: FC = () => {
	const navigate = useSoftNavigate();
	const isViewport960 = useResponsiveViewport(960);
	const [offerHoverStates, setOfferHoverStates] = useState<{[key: string]: boolean}>({});

	const offersSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		autoplay: false,
		fade: true,
	};

	const BigOfferDiv = (offer: gamesData, index: number) => {
		const positiveCount = offer.reviews.filter(review => review.type === "positive").length;
		const totalReviews = offer.reviews.length;
		const positivePercentage = (positiveCount / totalReviews) * 100;

		return (
      <div
        className="offer-result-container big"
        key={`offer-${index}`}
        onMouseEnter={() =>
          setOfferHoverStates(prevState => ({ ...prevState, [offer.id]: true }))
        }
        onMouseLeave={() =>
          setOfferHoverStates(prevState => ({
            ...prevState,
            [offer.id]: false,
          }))
        }
      >
        <a
          onClick={e => {
            navigate(`/game/${offer.id}`, e);
          }}
          className="offer-bg"
        >
          <div className="spotlight-img">
            <img
              src={
                offer.verticalHeaderImage || '/images/spotlight_background.jpg'
              }
              alt={offer.name}
            />
          </div>
          <div className="spotlight-content">
            <h2>{offer.offerType}</h2>
            <div className="spotlight-body">
              Offer ends {offer.offerEndDate}
            </div>
            <div className="spotlight-body spotlight-price price">
              <div className="discount-block-offers">
                <div className="discount-Percentage-offers">
                  -{offer.discountPercentage}%
                </div>
                <div className="discount-prices-offers">
                  <div className="original-price-offers">${offer.price}</div>
                  <div className="final-price-offers">
                    ${offer.discountPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
        {!isViewport960 && offerHoverStates[offer.id] && (
          <div>
            <HoverSummary
              title={offer.name}
              date={offer.releaseDate}
              screenshots={offer.moviesAndImages
                .filter(item => item.type === 'image' && item.featured)
                .map(item => item.link)}
              description={offer.description}
              positivePercentage={positivePercentage}
              totalReviews={totalReviews}
              tags={offer.tags}
              leftArrow={!isViewport960}
              rightArrow={!isViewport960}
            />
          </div>
        )}
      </div>
    );
	};

	const renderSmallGroupDiv = (offer: gamesData, index: number) => {
		const positiveCount = offer.reviews.filter(review => review.type === "positive").length;
		const totalReviews = offer.reviews.length;
		const positivePercentage = (positiveCount / totalReviews) * 100;
		
		return (
      <div className="offer-result-container small" key={`special-${index}`}>
        <div
          className="specials"
          onMouseEnter={() =>
            setOfferHoverStates(prevState => ({
              ...prevState,
              [offer.id]: true,
            }))
          }
          onMouseLeave={() =>
            setOfferHoverStates(prevState => ({
              ...prevState,
              [offer.id]: false,
            }))
          }
        >
          <a
            className="special-capsule"
            onClick={e => {
              navigate(`/game/${offer.id}`, e);
            }}
          >
            <div className="header-capsule">
              <img src={offer.horizontalHeaderImage} alt={offer.name} />
            </div>
            <div>
              <div className="discount-block-offers">
                <div className="discount-Percentage-offers">
                  -{offer.discountPercentage}%
                </div>
                <div className="discount-prices-offers">
                  <div className="original-price-offers">${offer.price}</div>
                  <div className="final-price-offers">
                    ${offer.discountPrice}
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        {!isViewport960 && offerHoverStates[offer.id] && (
          <div>
            <HoverSummary
              title={offer.name}
              date={offer.releaseDate}
              screenshots={offer.moviesAndImages
                .filter(item => item.type === 'image' && item.featured)
                .map(item => item.link)}
              description={offer.description}
              positivePercentage={positivePercentage}
              totalReviews={totalReviews}
              tags={offer.tags}
              leftArrow={!isViewport960}
              rightArrow={!isViewport960}
            />
          </div>
        )}
      </div>
    );
	};

	const BigOffers = (offers: gamesData[]) => (
		offers.map((offer, index) => (
			BigOfferDiv(offer, index)
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

		function SmallOffers(start: number) {
			const end = Math.min(start + 2, specialOffers.length);
			return renderSmallGroups(specialOffers.slice(start, end));
		}
		function BigOffer(start: number) {
			const end = Math.min(start + 1, offeredGames.length);
			return BigOffers(offeredGames.slice(start, end));
		}

		// Customized for 4 slides only (Every JSX Fragment is a slide) change if needed
		const configurations = [
			{
				bigOffers: 0,
				slides: [
					<>{SmallOffers(0)}{SmallOffers(2)}{SmallOffers(4)}</>,
					<>{SmallOffers(6)}{SmallOffers(8)}{SmallOffers(10)}</>,
					<>{SmallOffers(12)}{SmallOffers(14)}{SmallOffers(16)}</>,
					<>{SmallOffers(18)}{SmallOffers(20)}{SmallOffers(22)}</>,
				]
			},
			{
				bigOffers: 1,
				slides: [
					<>{BigOffer(0)}{SmallOffers(0)}{SmallOffers(2)}</>,
					<>{SmallOffers(4)}{SmallOffers(6)}{SmallOffers(8)}</>,
					<>{SmallOffers(10)}{SmallOffers(12)}{SmallOffers(14)}</>,
					<>{SmallOffers(16)}{SmallOffers(18)}{SmallOffers(20)}</>,
				]
			},
			{
				bigOffers: 2,
				slides: [
					<>{BigOffer(0)}{BigOffer(1)}{SmallOffers(0)}</>,
					<>{SmallOffers(2)}{SmallOffers(4)}{SmallOffers(6)}</>,
					<>{SmallOffers(8)}{SmallOffers(10)}{SmallOffers(12)}</>,
					<>{SmallOffers(14)}{SmallOffers(16)}{SmallOffers(18)}</>,
				]
			},
			{
				bigOffers: 3,
				slides: [
					<>{BigOffer(0)}{BigOffer(1)}{SmallOffers(0)}</>,
					<>{BigOffer(2)}{SmallOffers(2)}{SmallOffers(4)}</>,
					<>{SmallOffers(6)}{SmallOffers(8)}{SmallOffers(10)}</>,
					<>{SmallOffers(12)}{SmallOffers(14)}{SmallOffers(16)}</>,
				]
			},
			{
				bigOffers: 4,
				slides: [
					<>{BigOffer(0)}{BigOffer(1)}{SmallOffers(0)}</>,
					<>{BigOffer(2)}{BigOffer(3)}{SmallOffers(2)}</>,
					<>{SmallOffers(4)}{SmallOffers(6)}{SmallOffers(8)}</>,
					<>{SmallOffers(10)}{SmallOffers(12)}{SmallOffers(14)}</>,
				]
			},
			{
				bigOffers: 5,
				slides: [
					<>{BigOffer(0)}{BigOffer(1)}{SmallOffers(0)}</>,
					<>{BigOffer(2)}{BigOffer(3)}{SmallOffers(2)}</>,
					<>{BigOffer(4)}{SmallOffers(4)}{SmallOffers(6)}</>,
					<>{SmallOffers(8)}{SmallOffers(10)}{SmallOffers(12)}</>,
				]
			},
			{
				bigOffers: 6,
				slides: [
					<>{BigOffer(0)}{BigOffer(1)}{SmallOffers(0)}</>,
					<>{BigOffer(2)}{BigOffer(3)}{SmallOffers(2)}</>,
					<>{BigOffer(4)}{BigOffer(5)}{SmallOffers(4)}</>,
					<>{SmallOffers(6)}{SmallOffers(8)}{SmallOffers(10)}</>,
				]
			},
			{
				bigOffers: 7,
				slides: [
					<>{BigOffer(0)}{BigOffer(1)}{SmallOffers(0)}</>,
					<>{BigOffer(2)}{BigOffer(3)}{SmallOffers(2)}</>,
					<>{BigOffer(4)}{BigOffer(5)}{SmallOffers(4)}</>,
					<>{BigOffer(6)}{SmallOffers(6)}{SmallOffers(8)}</>,
				]
			},
			{
				bigOffers: 8,
				slides: [
					<>{BigOffer(0)}{BigOffer(1)}{SmallOffers(0)}</>,
					<>{BigOffer(2)}{BigOffer(3)}{SmallOffers(2)}</>,
					<>{BigOffer(4)}{BigOffer(5)}{SmallOffers(4)}</>,
					<>{BigOffer(6)}{BigOffer(7)}{SmallOffers(6)}</>,
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
            <a
              className="view-more"
              href="/search?priceOptions=Special%20Offers"
              onClick={e => {
                navigate('/search?priceOptions=Special%20Offers', e);
              }}
            >
              {/* Render different button on mobile */}
              {isViewport960 ? (
                <div className="mobile-more">
                  <div className="mobile-more-dive">
                    More{' '}
                    <img src="/images/ResponsiveChevron.svg" className="dive" />
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
              <div className="mobile-offers">{renderSlides()}</div>
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
