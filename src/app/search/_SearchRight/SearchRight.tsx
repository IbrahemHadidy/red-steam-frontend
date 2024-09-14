'use client';

// React
import { useState } from 'react';

// Components
import { FilterBlock } from './FilterBlock';
import { PriceFilterBlock } from './PriceFilterBlock';

// Types
import type { FC, JSX } from 'react';
import type { SearchRightProps } from '../Search.types';

export const SearchRight: FC<SearchRightProps> = ({
  rangeValue,
  setRangeValue,
  handlePriceChange,
  handlePriceRowClick,
  handleOptionRowClick,
  handleTagRowClick,
  handleTagRowExcludeClick,
  handleFeatureRowClick,
  handleDeveloperRowClick,
  handlePublisherRowClick,
  handleOSRowClick,
  handleLanguageRowClick,
  getPriceRangeLabel,
  filters,
  isViewport960,
}): JSX.Element => {
  // States
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleShowClick = (): void => {
    setIsShown(true);
  };

  const handleOverlayClick = (): void => {
    setIsShown(false);
  };

  const rightCol: JSX.Element = (
    <div className="search-rightcol">
      <PriceFilterBlock
        filters={filters.price}
        rangeValue={rangeValue}
        setRangeValue={setRangeValue}
        handlePriceChange={handlePriceChange}
        handlePriceRowClick={handlePriceRowClick}
        getPriceRangeLabel={getPriceRangeLabel}
      />
      <FilterBlock
        title="Preference"
        filters={filters.preference}
        handleIncludeClick={handleOptionRowClick}
        hasSearch={filters.preference.length > 10}
      />
      <FilterBlock
        title="Tag"
        filters={filters.tag}
        handleIncludeClick={handleTagRowClick}
        handleExcludeClick={handleTagRowExcludeClick}
        hasSearch={filters.tag.length > 10}
      />
      <FilterBlock
        title="Feature"
        filters={filters.feature}
        handleIncludeClick={handleFeatureRowClick}
        hasSearch={filters.feature.length > 10}
      />
      <FilterBlock
        title="Developer"
        filters={filters.developer}
        handleIncludeClick={handleDeveloperRowClick}
        hasSearch={filters.developer.length > 10}
      />
      <FilterBlock
        title="Publisher"
        filters={filters.publisher}
        handleIncludeClick={handlePublisherRowClick}
        hasSearch={filters.publisher.length > 10}
      />
      <FilterBlock
        title="OS"
        filters={filters.os}
        handleIncludeClick={handleOSRowClick}
        hasSearch={filters.os.length > 10}
      />
      <FilterBlock
        title="Language"
        filters={filters.language}
        handleIncludeClick={handleLanguageRowClick}
        hasSearch={filters.language.length > 10}
      />
    </div>
  );

  return !isViewport960 ? (
    rightCol
  ) : (
    <>
      <div className="open-filters" onClick={handleShowClick} />
      {isShown && <div className="overlay show" onClick={handleOverlayClick} />}
      <div className={`s-slide-menu ${isShown ? 'shown' : ''}`}>
        <div className="right-col-wrapper">{rightCol}</div>
      </div>
    </>
  );
};
