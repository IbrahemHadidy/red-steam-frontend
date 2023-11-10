import { FC, useState, useEffect } from "react";
import Slider from "react-slick";
import categories from "./categoryItems";
import "./Categories.css";

interface category {
  title: string;
  link: string;
  img: string;
  gradRGP: string;
}

const Categories: FC = () => {
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

  const categoriesSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    fade: true,
  };

  const renderCategory = (categories: category[]) => {
    return categories.map((category: category, index: number) => (
      <a className="category-item" href={category.link} key={index}>
        <img src={category.img} />
        <div
          className="category-gradient"
          style={{
            background: `linear-gradient(rgba(0,0,0,0), rgb(${category.gradRGP}) 100%)`,
          }}
        />
        <div className="category-label">
          <span>{category.title}</span>
        </div>
      </a>
    ));
  };

  const firstCategorySlide = (
    <>
      {renderCategory(categories.slice(0, 1))}
      {renderCategory(categories.slice(1, 2))}
      {renderCategory(categories.slice(2, 3))}
      {renderCategory(categories.slice(3, 4))}
    </>
  );
  const secondCategorySlide = (
    <>
      {renderCategory(categories.slice(4, 5))}
      {renderCategory(categories.slice(5, 6))}
      {renderCategory(categories.slice(6, 7))}
      {renderCategory(categories.slice(7, 8))}
    </>
  );
  const thirdCategorySlide = (
    <>
      {renderCategory(categories.slice(8, 9))}
      {renderCategory(categories.slice(9, 10))}
      {renderCategory(categories.slice(10, 11))}
      {renderCategory(categories.slice(11, 12))}
    </>
  );
  const fourthCategorySlide = (
    <>
      {renderCategory(categories.slice(12, 13))}
      {renderCategory(categories.slice(13, 14))}
      {renderCategory(categories.slice(14, 15))}
      {renderCategory(categories.slice(15, 16))}
    </>
  );
  const fifthCategorySlide = (
    <>
      {renderCategory(categories.slice(16, 17))}
      {renderCategory(categories.slice(17, 18))}
      {renderCategory(categories.slice(18, 19))}
      {renderCategory(categories.slice(19))}
    </>
  );

  return (
    <div className="home-section">
      <div className="home-contents">
        {" "}
        {isMobileView ? (
          <div className="mobile-mini">
            {firstCategorySlide}
            {secondCategorySlide}
            {thirdCategorySlide}
            {fourthCategorySlide}
            {fifthCategorySlide}
          </div>
        ) : (
          <>
            <div className="home-titles">BROWSE BY CATEGORY</div>
            <div className="mini-slides">
              <Slider {...categoriesSettings}>
                <div className="categories-row">{firstCategorySlide}</div>
                <div className="categories-row">{secondCategorySlide}</div>
                <div className="categories-row">{thirdCategorySlide}</div>
                <div className="categories-row">{fourthCategorySlide}</div>
                <div className="categories-row">{fifthCategorySlide}</div>
              </Slider>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
