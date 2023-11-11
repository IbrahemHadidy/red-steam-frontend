import { FC, useEffect, useState } from "react";
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

  const renderCategory = (category: category, index: number) => (
    <a className="category-item" href={category.link} key={index}>
      <img src={category.img} alt={category.title} />
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
  );

  const renderCategoryGroup = (categoryGroup: category[], index: number) => (
    <>
      {categoryGroup.map((category: category) => renderCategory(category, index))}
    </>
  );

  const categoryGroups = [
    categories.slice(0, 4),
    categories.slice(4, 8),
    categories.slice(8, 12),
    categories.slice(12, 16),
    categories.slice(16),
  ];

  return (
    <div className="home-section">
      <div className="home-contents">
        {isMobileView ? (
          <div className="mobile-mini">
            {categoryGroups.map((group, index) => (
              renderCategoryGroup(group, index)
            ))}
          </div>
        ) : (
          <>
            <div className="home-titles">BROWSE BY CATEGORY</div>
            <div className="mini-slides">
              <Slider {...categoriesSettings}>
                {categoryGroups.map((group, index) => (
                  <div className="categories-row" key={index}>
                    {renderCategoryGroup(group, index)}
                  </div>
                ))}
              </Slider>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
