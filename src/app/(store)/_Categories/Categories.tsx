'use client';

// React
import { Fragment } from 'react';

// NextJS
import Link from 'next/link';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Components
import Slider from 'react-slick';

// Services
import categories from '@services/menus/categoryItems';

// Types
import type { FC, JSX } from 'react';
import type { Settings as SliderSettings } from 'react-slick';
import type { Category } from '../Store.entity';

const Categories: FC = (): JSX.Element => {
  // Init
  const isViewport960 = useResponsiveViewport(960);

  const categoriesSettings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
  };

  const renderCategory = (category: Category, key: string): JSX.Element => (
    <Link className="category-item" href={category.link} key={key}>
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
    </Link>
  );

  const renderCategoryGroup = (categoryGroup: Category[], groupIndex: number): JSX.Element => (
    <>
      {categoryGroup.map((category, idx) =>
        renderCategory(category, (groupIndex * 1000 + idx).toString())
      )}
    </>
  );

  const categoryGroups: Category[][] = [
    categories.slice(0, 4),
    categories.slice(4, 8),
    categories.slice(8, 12),
    categories.slice(12, 16),
    categories.slice(16),
  ];

  return (
    <div className="home-section">
      <div className="home-contents">
        {isViewport960 ? (
          <div className="mobile-mini">
            {categoryGroups.map((group, idx) => (
              <Fragment key={idx}>{renderCategoryGroup(group, idx)}</Fragment>
            ))}
          </div>
        ) : (
          <>
            <div className="home-titles">BROWSE BY CATEGORY</div>
            <div className="mini-slides">
              <Slider {...categoriesSettings}>
                {categoryGroups.map((group, idx) => (
                  <div className="categories-row" key={idx * 100}>
                    {renderCategoryGroup(group, idx)}
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
