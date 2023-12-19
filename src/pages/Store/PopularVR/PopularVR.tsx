import { FC } from "react";
import Slider from "react-slick";
import useResponsiveViewports from "../../../components/useResponsiveViewports";
import popularVRGames from "./popularVRGames";

interface vrGame {
  link: string;
  img: string;
  discount: "no-discount" | "discount";
  discountPercentage?: string;
  price: string;
  discountPrice?: string;
}

const PopularVR: FC = () => {
  const { isMobileView } = useResponsiveViewports();

  const vrGamesSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    fade: true,
  };

  const renderGameItem = (game: vrGame, index: number) => (
    <a className="mini-item" href={game.link} key={index}>
      <div className="mini-capsule">
        <img src={game.img} alt={game.link} />
      </div>
      <div className="mini-price">
        <div className={game.discount}>
          <div className="price">
            {game.discount === "no-discount" ? (
              game.price
            ) : (
              <div className="mini-discount-block">
                <div className="discount-percentage">
                  {game.discountPercentage}
                </div>
                <div className="discount-prices">
                  <div className="original-price">{game.price}</div>
                  <div className="final-price">{game.discountPrice}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );

  const renderCategorySlide = (start: number, end: number) => {
    const categoryGames = popularVRGames.slice(start, end);
    return categoryGames.map((game, index) => (
      renderGameItem(game, index)
    ));
  };

  const renderAllCategories = () => {
    const categorySlides = [];

    // Edit `the i < "num"` for how much slide sections you want
    for (let i = 0; i < 3; i++) {
      const start = i * 4;
      const end = start + 4;
      categorySlides.push(renderCategorySlide(start, end));
    }
    return categorySlides;
  };

  return (
    <div className="home-section">
      <div className="home-contents">
        <h2 className="main-btn-title">
          POPULAR VR GAMES
          <span className="right-btn">
            <a className="view-more" href="">
              {isMobileView ? (
                <div className="mobile-more">
                  <div className="mobile-more-dive">
                    More{" "}
                    <img src="/images/ResponsiveChevron.svg" className="dive" />
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
            {renderAllCategories()}
          </div>
        ) : (
          <div className="mini-slides mini">
            <Slider {...vrGamesSettings}>
              {renderAllCategories().map((categorySlide, index) => (
                <div className="mini-row" key={index}>
                  {categorySlide}
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularVR;
