import { FC, useState } from "react";
import Slider from "react-slick";
import featuredGames, { FeaturedGame } from "../featuredGames";

const FeaturedDesktop: FC = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleMouseEnter = (imageUrl: string | null) => {
    setHoveredImage(imageUrl || null);
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
          {featuredGames.map((slide: FeaturedGame, index) => (
            <a key={index} className="slide" href={slide.gameLink}>
              <div
                className="main-card"
                style={{
                  backgroundImage: `url(${hoveredImage || slide.mainImage})`,
                  transition: "background-image 0.1s",
                }}
              ></div>
              <div className="info-card">
                <div className="app-name">
                  <div>{slide.gameName}</div>
                </div>
                <div className="photos">
                  <div>
                    <div
                      onMouseEnter={() => handleMouseEnter(slide.image1 || "")}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        backgroundImage: `url(${slide.image1 || ""})`,
                      }}
                    ></div>
                  </div>
                  <div>
                    <div
                      onMouseEnter={() => handleMouseEnter(slide.image2 || "")}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        backgroundImage: `url(${slide.image2 || ""})`,
                      }}
                    ></div>
                  </div>
                  <div>
                    <div
                      onMouseEnter={() => handleMouseEnter(slide.image3 || "")}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        backgroundImage: `url(${slide.image3 || ""})`,
                      }}
                    ></div>
                  </div>
                  <div>
                    <div
                      onMouseEnter={() => handleMouseEnter(slide.image4 || "")}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        backgroundImage: `url(${slide.image4 || ""})`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="reason">
                  <div className={slide.reason}>
                    {slide.reason === "available" ? (
                      <div>Now Available</div>
                    ) : (
                      <>
                        <strong>Recommended</strong> because you played games
                        tagged with
                      </>
                    )}
                  </div>
                  <div className="tags">
                    <span>{slide.tag1 || null}</span>
                    <span>{slide.tag2 || null}</span>
                    <span>{slide.tag3 || null}</span>
                    <span>{slide.tag4 || null}</span>
                  </div>
                </div>
                {slide.discount === "no-discount" ? (
                  <div className="no-discount">
                    <div className="price">{slide.price} USD</div>
                  </div>
                ) : (
                  <div className="discount">
                    <div className="discount-block">
                        <div className="discount-percentage">
                          {slide.discountPercentage}
                        </div>
                        <div className="discount-prices">
                          <div className="original-price">{slide.price}</div>
                          <div className="final-price">
                            {slide.discountPrice} USD
                          </div>
                        </div>
                      </div>
                    <div className="price">
                    </div>
                  </div>
                )}
                <div className="platform">
                  <span className={slide.win || ""}></span>
                  <span className={slide.mac || ""}></span>
                </div>
              </div>
            </a>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FeaturedDesktop;
