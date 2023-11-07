import React from "react";
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
  const offersSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    fade: true,
  };

  const renderOfferBgDiv = (offer: OfferedGame) => {
    return (
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
                <div className="original-price-offers">{offer.beforeDiscountPrice}</div>
                <div className="final-price-offers">
                  {offer.discountPrice}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSmallGroupDiv = (offer: OfferedGame) => {
    return (
      <div className="small-group">
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
                  <div className="original-price-offers">{offer.beforeDiscountPrice}</div>
                  <div className="final-price-offers">
                    {offer.discountPrice}
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="offers-carousel">
      <div className="main-offers-content">
        <h2 className="main-offers-title">
          Special Offers
          <span className="right-btn">
            <a className="view-more" href="">
              <span>Browse More</span>
            </a>
          </span>
        </h2>
        <div className="offers-slides">
          <div className="offers-items">
            <Slider {...offersSettings}>
              <div className="offers-row">
                {offeredGames.map((offer, index) => (
                  <div className="offers-group" key={index}>
                    {renderOfferBgDiv(offer)}
                  </div>
                ))}
                {specialOffers.map((offer, index) => (
                  <div className="offers-group" key={index}>
                    {renderOfferBgDiv(offer)}
                  </div>
                ))}
                {specialOffers.map((offer, index) => (
                  <div className="offers-group" key={index}>
                    {renderSmallGroupDiv(offer)}
                  </div>
                ))}
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
