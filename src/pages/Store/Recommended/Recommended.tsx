import { FC, useState, useEffect } from "react";
import Slider from "react-slick";
import recommended from "./recommendedGames";

interface recommendedItem {
  link: string;
  img: string;
  discount: "no-discount" | "discount";
  discountPrecentage?: string;
  price: string;
  discountPrice?: string;
}

const Recommended: FC = () => {
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

  const recommendedSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    fade: true,
  };

  const renderRecomendation = (recommended: recommendedItem[]) => {
    return recommended.map((recommended: recommendedItem, index: number) => (
      <a className="mini-item" href={recommended.link} key={index}>
        <div className="mini-capsule">
          <img src={recommended.img} />
        </div>
        <div className="mini-price">
          <div className={recommended.discount}>
            <div className="price">
              {recommended.discount === "no-discount" ? (
                recommended.price
              ) : (
                <div className="mini-discount-block">
                  <div className="discount-precentage">
                    {recommended.discountPrecentage}
                  </div>
                  <div className="discount-prices">
                    <div className="original-price">{recommended.price}</div>
                    <div className="final-price">
                      {recommended.discountPrice}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    ));
  };

  const firstCategorySlide = (
    <>
      {renderRecomendation(recommended.slice(0, 1))}
      {renderRecomendation(recommended.slice(1, 2))}
      {renderRecomendation(recommended.slice(2, 3))}
      {renderRecomendation(recommended.slice(3, 4))}
    </>
  );
  const secondCategorySlide = (
    <>
      {renderRecomendation(recommended.slice(4, 5))}
      {renderRecomendation(recommended.slice(5, 6))}
      {renderRecomendation(recommended.slice(6, 7))}
      {renderRecomendation(recommended.slice(7, 8))}
    </>
  );
  const thirdCategorySlide = (
    <>
      {renderRecomendation(recommended.slice(8, 9))}
      {renderRecomendation(recommended.slice(9, 10))}
      {renderRecomendation(recommended.slice(10, 11))}
      {renderRecomendation(recommended.slice(11, 12))}
    </>
  );
  
  return (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">
          RECOMMENDED BASED ON THE GAMES YOU PLAY
          <span className="right-btn">
            <a className="view-more" href="">
              {/* Render different button on mobile */}
              {isMobileView ? (
                <div className="mobile-more">
                  <div className="mobile-more-dive">
                    More{" "}
                    <img src="images/ResponsiveChevron.svg" className="dive" />
                  </div>
                </div>
              ) : (
                <span>EXPLORE AND CUSTOMIZE</span>
              )}
            </a>
          </span>
        </h2>
        {isMobileView ? (
          <div className="mobile-mini mini">
            {firstCategorySlide}
            {secondCategorySlide}
            {thirdCategorySlide}
          </div>
        ) : (
          <>
            <div className="mini-slides mini">
              <Slider {...recommendedSettings}>
                <div className="mini-row">{firstCategorySlide}</div>
                <div className="mini-row">{secondCategorySlide}</div>
                <div className="mini-row">{thirdCategorySlide}</div>
              </Slider>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recommended;
