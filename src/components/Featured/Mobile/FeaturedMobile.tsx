import React from "react";
import featuredGames from "../featuredGames";

const FeaturedMobile: React.FC = () => {
  return (
    <div className="featured-carousel">
      <div className="main-carousel-content">
        <h2 className="main-carousel-title">Featured & Recommended</h2>
        <div className="mobile-carousel">
          {featuredGames.map((slide, index) => (
            <a key={index} className="mobile-capsule" href={slide.gameLink}>
              <div
                className="mobile-capsule-content"
                style={{ backgroundImage: `url(${slide.mainImage})` }}
              ></div>
              <div className="info-card">
                <div className="app-name">
                  <div>{slide.gameName}</div>
                </div>
                <div className="discount no-discount">
                  <div className="price">
                    {slide.discount === "no-discount" ? (
                      slide.price
                    ) : (
                      <div className="discount-block">
                        <div className="discount-precentage">
                          {slide.discountPrecentage}
                        </div>
                        <div className="discount-prices">
                          <div className="original-price">{slide.price}</div>
                          <div className="final-price">
                            {slide.discountPrice}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="platform">
                  <span className={slide.win ? "some-win-class" : ""}></span>
                  <span className={slide.mac ? "some-mac-class" : ""}></span>
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
