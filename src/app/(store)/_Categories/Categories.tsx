// React
import { Fragment } from 'react';

// NextJS
import dynamic from 'next/dynamic';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Components
import Slider from 'react-slick';
const Category = dynamic(() => import('./Category'));

// Constants
import CATEGORIES from '@constants/categories';

// Types
import type { JSX } from 'react';
import type { Settings as SliderSettings } from 'react-slick';
import type { Category } from '../Store.types';

export default function Categories() {
  //--------------------------- Initializations ---------------------------//
  const isViewport960OrLess = useResponsiveViewport(960);

  //---------------------------- Slider Config ----------------------------//
  // Slider Settings
  const categoriesSettings: SliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
  };

  // Category Groups (5 per row)
  const categoryGroups: Category[][] = [
    CATEGORIES.slice(0, 4),
    CATEGORIES.slice(4, 8),
    CATEGORIES.slice(8, 12),
    CATEGORIES.slice(12, 16),
    CATEGORIES.slice(16),
  ];

  //-------------------------- Utility Functions --------------------------//
  const renderCategoryGroup = (categoryGroup: Category[], groupIndex: number): JSX.Element => (
    <>
      {categoryGroup.map((category, idx) => (
        <Category category={category} key={(groupIndex * 1000 + idx).toString()} />
      ))}
    </>
  );

  //-------------------------- Render UI Section --------------------------//
  return (
    <div className="home-section">
      <div className="home-contents">
        {isViewport960OrLess ? (
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
}
