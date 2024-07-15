'use client';

// React
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Next.js
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';
import { SearchLeft } from './SearchLeft';
import { SearchRight } from './SearchRight';

// Hooks
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Images
import searchCrouton from 'images/search_crouton_not.svg';

// Styles
import './Search.scss';

// Types
import type { ChangeEvent, FC, MouseEvent as ReactMouseEvent } from 'react';
import type { Filter, FilterState } from './Search.types';

const Search: FC = () => {
  // Intitializations
  const router = useRouter();
  const searchParams = useSearchParams();
  const isViewport960 = useResponsiveViewport(960);

  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Relevance');
  const [searchValue, setSearchValue] = useState<string>('enter search term or tag');
  const [savedSearchValue, setSavedSearchValue] = useState<string>('');
  const [rangeValue, setRangeValue] = useState<number>(13);
  const [filters, setFilters] = useState<FilterState>({
    price: [
      { name: 'Special Offers', check: 'unchecked' },
      { name: 'Hide free to play games', check: 'unchecked' },
    ],
    tag: [
      { name: 'Battle Royal', check: 'unchecked' },
      { name: 'Multiplayer', check: 'unchecked' },
      { name: 'Martial Arts', check: 'unchecked' },
      { name: 'PvP', check: 'unchecked' },
      { name: 'Survival', check: 'unchecked' },
      { name: 'Shooter', check: 'unchecked' },
      { name: 'RPG', check: 'unchecked' },
      { name: 'Open World', check: 'unchecked' },
      { name: 'Story Rich', check: 'unchecked' },
      { name: 'Singleplayer', check: 'unchecked' },
      { name: 'Dark', check: 'unchecked' },
      { name: 'Fantasy', check: 'unchecked' },
      { name: 'Horror', check: 'unchecked' },
      { name: 'Difficult', check: 'unchecked' },
      { name: 'Action', check: 'unchecked' },
      { name: 'Souls-like', check: 'unchecked' },
      // TODO: make it fetch dynamic from backend
    ],
    os: [
      { name: 'Windows', check: 'unchecked' },
      { name: 'macOS', check: 'unchecked' },
    ],
  });

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  useDynamicMetaTags({
    title: 'Red Steam Search',
    background: '#1b2838',
    description: 'Search through Red Steam games and discover the best games.',
  });

  useEffect(() => {
    console.log(filters);
  }, [filters, searchParams]);

  const selectOptions = [
    'Relevance',
    'Release date',
    'Name',
    'Lowest Price',
    'Highest Price',
    'User Reviews',
  ];

  const labels = useMemo(
    () => [
      'Free',
      'Under $5.00',
      'Under $10.00',
      'Under $15.00',
      'Under $20.00',
      'Under $25.00',
      'Under $30.00',
      'Under $35.00',
      'Under $40.00',
      'Under $45.00',
      'Under $50.00',
      'Under $55.00',
      'Under $60.00',
      'Any Price',
    ],
    []
  );

  const getPriceRangeLabel = useCallback(
    (value: number) => {
      return labels[value] || 'Any Price';
    },
    [labels]
  );

  const getPriceRangeNumber = useCallback(
    (label: string) => {
      return labels.indexOf(label);
    },
    [labels]
  );

  const updateFromURL = useCallback(() => {
    // Extract and update search term
    const searchTerm = searchParams?.get('term') || 'enter search term or tag';
    setSearchValue(decodeURIComponent(searchTerm));
    if (searchTerm !== 'enter search term or tag') {
      setSavedSearchValue(decodeURIComponent(searchTerm));
    }

    // Extract and update sort option
    const sortOption = searchParams?.get('sort') || 'Relevance';
    setSelectedOption(decodeURIComponent(sortOption));

    // Extract and update price range
    const priceRangeLabel = searchParams?.get('price') || getPriceRangeLabel(13);
    setRangeValue(getPriceRangeNumber(decodeURIComponent(priceRangeLabel)));

    // Extract and update checked price options
    const priceOptions = searchParams?.get('priceOptions')?.split(',') || [];
    setFilters((prevState) => ({
      ...prevState,
      price: prevState.price.map((row) =>
        priceOptions.includes(row.name) ? { ...row, check: 'included' } : row
      ),
    }));

    // Extract and update checked tag rows
    const checkedTags = searchParams?.get('tags')?.split(',') || [];
    setFilters((prevState) => ({
      ...prevState,
      tag: prevState.tag.map((row) =>
        checkedTags.includes(row.name) ? { ...row, check: 'included' } : row
      ),
    }));

    // Extract and update excluded tag rows
    const excludedTags = searchParams?.get('excludedTags')?.split(',') || [];
    setFilters((prevState) => ({
      ...prevState,
      tag: prevState.tag.map((row) =>
        excludedTags.includes(row.name) ? { ...row, check: 'excluded' } : row
      ),
    }));

    // Extract and update checked OS rows
    const checkedOS = searchParams?.get('os')?.split(',') || [];
    setFilters((prevState) => ({
      ...prevState,
      os: prevState.os.map((row) =>
        checkedOS.includes(row.name) ? { ...row, check: 'included' } : row
      ),
    }));
  }, [getPriceRangeLabel, getPriceRangeNumber, searchParams]);

  useEffect(() => {
    updateFromURL();
  }, [updateFromURL]);

  const constructSearchURL = useCallback(() => {
    // Helper function to create query strings
    const createQueryString = (key: string, value: string | number | string[]) => {
      if (Array.isArray(value)) {
        return value.length > 0 ? `${key}=${value.join(',')}` : '';
      }
      return value ? `${key}=${encodeURIComponent(value)}` : '';
    };

    // Build query parameters
    const queryParams = [
      createQueryString('term', savedSearchValue),
      createQueryString('sort', selectedOption),
      createQueryString('price', getPriceRangeLabel(rangeValue)),
      createQueryString(
        'priceOptions',
        filters.price.filter((f) => f.check === 'included').map((f) => f.name)
      ),
      createQueryString(
        'tags',
        filters.tag.filter((f) => f.check === 'included').map((f) => f.name)
      ),
      createQueryString(
        'excludedTags',
        filters.tag.filter((f) => f.check === 'excluded').map((f) => f.name)
      ),
      createQueryString(
        'os',
        filters.os.filter((f) => f.check === 'included').map((f) => f.name)
      ),
    ];

    // Join all query parameters and append to base URL
    const baseURL = '/search'; // Change to your base URL or path
    const queryString = queryParams.filter((param) => param !== '').join('&');
    const fullURL = queryString ? `${baseURL}?${queryString}` : baseURL;

    // Use router to navigate or update URL
    console.log(fullURL);
    router.push(fullURL);
  }, [filters, getPriceRangeLabel, rangeValue, router, savedSearchValue, selectedOption]);

  useEffect(() => {
    constructSearchURL();
  }, [constructSearchURL, filters]);

  const updateFilters = (type: string, name: string, check: string) => {
    setFilters((prevFilters) => {
      const filterTypeKey = type as keyof FilterState;
      const updatedFilters = prevFilters[filterTypeKey].map((filter) =>
        filter.name === name ? { ...filter, check } : filter
      );
      return { ...prevFilters, [filterTypeKey]: updatedFilters };
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (searchValue === 'enter search term or tag') {
      setSearchValue('');
    }
  };

  const handleSearchButton = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (searchValue === 'enter search term or tag' || searchValue.trim() === '') {
      setSavedSearchValue('');
    } else {
      setSavedSearchValue(searchValue);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePriceChange = (value: number) => {
    setRangeValue(value);
  };

  const handleFilterIncludeClick = (filterType: string, row: { name: string; check: string }) => {
    const newCheck = row.check === 'included' ? 'unchecked' : 'included';
    updateFilters(filterType, row.name, newCheck);
  };

  const handleFilterExcludeClick = (filterType: string, row: { name: string; check: string }) => {
    const newCheck = row.check === 'excluded' ? 'unchecked' : 'excluded';
    updateFilters(filterType, row.name, newCheck);
  };

  const handleFilterDelete = (filterType: keyof FilterState, name: string) => {
    setFilters((prevFilters) => {
      const updatedFilters = prevFilters[filterType].map((filter) =>
        filter.name === name ? { ...filter, check: 'unchecked' } : filter
      );
      return { ...prevFilters, [filterType]: updatedFilters };
    });
  };

  const handleSearchDeleteFilter = () => {
    setSearchValue('enter search term or tag');
    setSavedSearchValue('');
  };

  const searchRight = (
    <SearchRight
      rangeValue={rangeValue}
      setRangeValue={setRangeValue}
      handlePriceChange={handlePriceChange}
      handlePriceRowClick={(row) => handleFilterIncludeClick('price', row)}
      handleTagRowClick={(row) => handleFilterIncludeClick('tag', row)}
      handleTagRowExcludeClick={(row) => handleFilterExcludeClick('tag', row)}
      handleOSRowClick={(row) => handleFilterIncludeClick('os', row)}
      getPriceRangeLabel={getPriceRangeLabel}
      filters={filters}
      isViewport960={isViewport960}
    />
  );

  const searchLeft = (
    <SearchLeft
      toggleDropdown={toggleDropdown}
      selectedOption={selectedOption}
      isOpen={isOpen}
      selectOptions={selectOptions}
      selectOption={selectOption}
      inputRef={inputRef}
      searchValue={searchValue}
      handleSearch={handleSearch}
      handleInputChange={handleInputChange}
      handleSearchButton={handleSearchButton}
      isViewport960={isViewport960}
    />
  );

  return (
    <>
      {isViewport960 && searchRight}
      <Header />
      <div className="search-header">
        <SecondNavbar />
        <div className="page-content" style={{ marginTop: '20px', paddingLeft: '2px' }}>
          {filters.tag.filter((row) => row.check === 'included').length === 0 &&
          savedSearchValue === '' ? (
            <div className="search-title">All Products</div>
          ) : (
            <>
              {savedSearchValue !== '' && (
                <div className="search-tag">
                  {savedSearchValue}
                  <a onClick={handleSearchDeleteFilter} />
                </div>
              )}
              {filters.tag.map(
                (row: Filter) =>
                  row.check === 'included' && (
                    <div className="search-tag" key={row.name}>
                      {row.name}
                      <a onClick={() => handleFilterDelete('tag', row.name)} />
                    </div>
                  )
              )}
              {filters.tag.map(
                (row: Filter) =>
                  row.check === 'excluded' && (
                    <div className="search-tag excluded" key={row.name}>
                      <Image src={searchCrouton} alt="excluded" />
                      {row.name}
                      <a onClick={() => handleFilterDelete('tag', row.name)} />
                    </div>
                  )
              )}
            </>
          )}
        </div>
      </div>
      <div className="s-page-content">
        <form id="search-form" className="search-form">
          {searchLeft}
          {!isViewport960 && searchRight}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Search;
