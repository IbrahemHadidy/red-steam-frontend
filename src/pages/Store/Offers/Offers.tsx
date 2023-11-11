import { FC, useEffect, useState } from "react";
import { offeredGames, specialOffers } from "./OfferedGames";
import Slider from "react-slick";
import "./Offers.css";

interface OfferedGame {
  offerLink: string;
  image: string;
  offerType?: string;
  endTime?: string;
  beforeDiscountPrice?: string;
  discountPrice?: string;
  discountPercentage: string;
}

const Offers: FC = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const offersSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    fade: true,
  };

  const renderOfferDiv = (offer: OfferedGame, index: number) => (
    <div className="offer-bg" key={`offer-${index}`}>
      <div className="spotlight-img">
        <a href={offer.offerLink}>
          <img src={offer.image} alt={offer.offerLink} />
        </a>
      </div>
      <div className="spotlight-content">
        <h2>{offer.offerType}</h2>
        <div className="spotlight-body">Offer ends {offer.endTime}</div>
        <div className="spotlight-body spotlight-price price">
          <div className="discount-block-offers">
            <div className="discount-Percentage-offers">
              {offer.discountPercentage}
            </div>
            <div className="discount-prices-offers">
              <div className="original-price-offers">
                {offer.beforeDiscountPrice}
              </div>
              <div className="final-price-offers">{offer.discountPrice}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSmallGroupDiv = (offer: OfferedGame, index: number) => (
    <div className="specials" key={`special-${index}`}>
      <a className="special-capsule" href={offer.offerLink}>
        <div className="header-capsule">
          <img src={offer.image} alt={offer.offerLink} />
        </div>
        <div>
          <div className="discount-block-offers">
            <div className="discount-Percentage-offers">
              {offer.discountPercentage}
            </div>
            <div className="discount-prices-offers">
              <div className="original-price-offers">
                {offer.beforeDiscountPrice}
              </div>
              <div className="final-price-offers">{offer.discountPrice}</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );

  const renderOffers = (offers: OfferedGame[]) => (
    offers.map((offer: OfferedGame, index: number) => (
      renderOfferDiv(offer, index)
    ))
  );

  const renderSmallGroups = (specialOffers: OfferedGame[]) => (
    <div className="small-group">
      {specialOffers.map((specialOffer: OfferedGame, index: number) => (
        renderSmallGroupDiv(specialOffer, index) 
      ))}
    </div>
  );


  //---- Change the structure of the slides from here and change the data structure if needed ----//
  const renderSlides = () => {
    const slides = [
      <>
        {renderOffers(offeredGames.slice(0, 2))}
        {renderSmallGroups(specialOffers.slice(0, 2))}
      </>,
      <>
        {renderOffers(offeredGames.slice(2, 4))}
        {renderSmallGroups(specialOffers.slice(2, 4))}
      </>,
      <>
        {renderOffers(offeredGames.slice(4))}
        {renderSmallGroups(specialOffers.slice(4, 6))}
        {renderSmallGroups(specialOffers.slice(6, 8))}
      </>,
      <>
        {renderSmallGroups(specialOffers.slice(8, 10))}
        {renderSmallGroups(specialOffers.slice(10, 12))}
        {renderSmallGroups(specialOffers.slice(12, 14))}
      </>,
    ];
  
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
            <a className="view-more" href="">

              {/* Render different button on mobile */}
              {isMobileView ? (
                <div className="mobile-more">
                  <div className="mobile-more-dive">
                    More{" "}
                    <img
                      src="images/ResponsiveChevron.svg"
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
            {isMobileView ? (

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
