import { FC, useState, useEffect } from "react";
import Slider from "react-slick";
import popularVRGames from "./popularVRGames";

interface vrGame {
  link: string;
  img: string;
  discount: "no-discount" | "discount";
  discountPrecentage?: string;
  price: string;
  discountPrice?: string;
}


const PopularVR: FC = () => {
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

  const vrGamesSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    fade: true,
  };

  const renderRecomendation = (recommended: vrGame[]) => {
    return recommended.map((recommended: vrGame, index: number) => (
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
      {renderRecomendation(popularVRGames.slice(0, 1))}
      {renderRecomendation(popularVRGames.slice(1, 2))}
      {renderRecomendation(popularVRGames.slice(2, 3))}
      {renderRecomendation(popularVRGames.slice(3, 4))}
    </>
  );
  const secondCategorySlide = (
    <>
      {renderRecomendation(popularVRGames.slice(4, 5))}
      {renderRecomendation(popularVRGames.slice(5, 6))}
      {renderRecomendation(popularVRGames.slice(6, 7))}
      {renderRecomendation(popularVRGames.slice(7, 8))}
    </>
  );
  const thirdCategorySlide = (
    <>
      {renderRecomendation(popularVRGames.slice(8, 9))}
      {renderRecomendation(popularVRGames.slice(9, 10))}
      {renderRecomendation(popularVRGames.slice(10, 11))}
      {renderRecomendation(popularVRGames.slice(11, 12))}
    </>
  );
  const fourthCategorySlide = (
    <>
      {renderRecomendation(popularVRGames.slice(12, 13))}
      {renderRecomendation(popularVRGames.slice(13, 14))}
      {renderRecomendation(popularVRGames.slice(14, 15))}
      {renderRecomendation(popularVRGames.slice(15, 16))}
    </>
  );
  const fifthCategorySlide = (
    <>
      {renderRecomendation(popularVRGames.slice(16, 17))}
      {renderRecomendation(popularVRGames.slice(17, 18))}
      {renderRecomendation(popularVRGames.slice(18, 19))}
      {renderRecomendation(popularVRGames.slice(19, 20))}
    </>
  );
  const sixthCategorySlide = (
    <>
      {renderRecomendation(popularVRGames.slice(20, 21))}
      {renderRecomendation(popularVRGames.slice(21, 22))}
      {renderRecomendation(popularVRGames.slice(22, 23))}
      {renderRecomendation(popularVRGames.slice(23, 24))}
    </>
  );
  const seventhCategorySlide = (
    <>
      {renderRecomendation(popularVRGames.slice(24, 25))}
      {renderRecomendation(popularVRGames.slice(25, 26))}
      {renderRecomendation(popularVRGames.slice(26, 27))}
      {renderRecomendation(popularVRGames.slice(27, 28))}
    </>
  );
  
  
  return (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">
        POPULAR VR GAMES
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
                <span>BROWSE ALL</span>
              )}
            </a>
          </span>
        </h2>
        {isMobileView ? (
          <div className="mobile-mini mini">
            {firstCategorySlide}
            {secondCategorySlide}
            {thirdCategorySlide}
            {fourthCategorySlide}
            {fifthCategorySlide}
            {sixthCategorySlide}
            {seventhCategorySlide}
          </div>
        ) : (
          <>
            <div className="mini-slides mini">
              <Slider {...vrGamesSettings}>
                <div className="mini-row">{firstCategorySlide}</div>
                <div className="mini-row">{secondCategorySlide}</div>
                <div className="mini-row">{thirdCategorySlide}</div>
                <div className="mini-row">{fourthCategorySlide}</div>
                <div className="mini-row">{fifthCategorySlide}</div>
                <div className="mini-row">{sixthCategorySlide}</div>
                <div className="mini-row">{seventhCategorySlide}</div>
              </Slider>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopularVR;
