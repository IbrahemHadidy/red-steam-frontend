import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { offeredGames, specialOffers } from "./Offers/OfferedGames";
import "./Offers/Offers.css";

interface OfferedGame {
  offerLink: string;
  image: string;
  offerType?: string;
  endTime?: string;
  beforeDiscountPrice?: string;
  discountPrice?: string;
  discountPrecentage: string;
}

const Offers: React.FC = () => {
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

  // Create constants for repeated div elements
  const renderOfferBgDiv = (offer: OfferedGame) => (
    <div className="offer-bg">
      <div className="spotlight-img">
        <a href={offer.offerLink}>
          <img src={offer.image} />
        </a>
      </div>
      <div className="spotlight-content">
        <h2>{offer.offerType}</h2>
        <div className="spotlight-body">Offer ends {offer.endTime}</div>
        <div className="spotlight-body spotlight-price price">
          <div className="discount-block-offers">
            <div className="discount-precentage-offers">
              {offer.discountPrecentage}
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

  const renderSmallGroupDiv = (offer: OfferedGame) => (
    <div className="specials">
      <a className="special-capsule" href={offer.offerLink}>
        <div className="header-capsule">
          <img src={offer.image} />
        </div>
        <div>
          <div className="discount-block-offers">
            <div className="discount-precentage-offers">
              {offer.discountPrecentage}
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

  const renderRegularOffers = (offers: OfferedGame[]) => (
    <>
      {offers.map((offer: OfferedGame, index: number) => (
        <div className="offers-group" key={index}>
          {renderOfferBgDiv(offer)}
        </div>
      ))}
    </>
  );
  
  const renderSpecialOffers = (specialOffers: OfferedGame[]) => (
    <div className="small-group">
      {specialOffers.map((specialOffer: OfferedGame, index: number) => (
        renderSmallGroupDiv(specialOffer)
      ))}
    </div>
  );






  //------------------------ Change the structure of the slides from here and change the data structure if needed ------------------------//
  const firstSlide = (
    <>
      {renderRegularOffers(offeredGames.slice(0, 2))}
      {renderSpecialOffers(specialOffers.slice(0, 2))}
    </>
  );
  const secondSlide = (
    <>
      {renderRegularOffers(offeredGames.slice(2, 4))}
      {renderSpecialOffers(specialOffers.slice(2, 4))}
    </>
  );
  const thirdSlide = (
    <>
      {renderRegularOffers(offeredGames.slice(4))}
      {renderSpecialOffers(specialOffers.slice(4, 6))}
      {renderSpecialOffers(specialOffers.slice(6, 8))}
    </>
  );
  const fourthSlide = (
    <>
      {renderSpecialOffers(specialOffers.slice(8, 10))}
      {renderSpecialOffers(specialOffers.slice(10, 12))}
      {renderSpecialOffers(specialOffers.slice(12, 14))}
    </>
  );






  return (
    <div className="offers-carousel">
      <div className="main-offers-content">
        <h2 className="main-offers-title">
          Special Offers
          <span className="right-btn">
            <a className="view-more" href="">

              {/* Render different button on mobile */}
              {isMobileView ? (
                <div className="mobile-more">
                  <div className="mobile-more-dive">
                    More{" "}
                    <img
                      src="../../images/ResponsiveChevron.svg"
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
              {firstSlide}
              {secondSlide}
              {thirdSlide}
              {fourthSlide}
            </div>
          ) : (

            // Desktop Component
            <Slider {...offersSettings}>
              <div className="offers-row">{firstSlide}</div>
              <div className="offers-row">{secondSlide}</div>   
              <div className="offers-row">{thirdSlide}</div>
              <div className="offers-row">{fourthSlide}</div>
            </Slider>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
