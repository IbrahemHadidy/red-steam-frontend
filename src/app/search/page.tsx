'use client';

// React
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import SecondNavbar from 'components/SecondNavbar/SecondNavbar';
import { SearchLeft } from './_SearchLeft/SearchLeft';
import { SearchRight } from './_SearchRight/SearchRight';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Hooks
import useDynamicBackground from 'hooks/useDynamicBackground';
import useResponsiveViewport from 'hooks/useResponsiveViewport';

// Images
import searchCrouton from 'images/search_crouton_not.svg';

// Types
import type { ChangeEvent, FC, JSX, MouseEvent } from 'react';
import type { Filter, FilterState } from './Search.types';

const SearchPage: FC = (): JSX.Element => {
  // Intitializations
  const router = useRouter();
  const searchParams = useSearchParams();
  const isViewport960 = useResponsiveViewport(960);
  useDynamicBackground('#1b2838');

  // Contexts
  const { isLoggedIn } = useContext(AuthContext);

  // States
  const [requestParameters, setRequestParameters] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Relevance');
  const [searchValue, setSearchValue] = useState<string>('enter search term or tag');
  const [savedSearchValue, setSavedSearchValue] = useState<string>('');
  const [rangeValue, setRangeValue] = useState<number>(13);
  const [filters, setFilters] = useState<FilterState>({
    price: [
      { id: 1, name: 'Special Offers', check: 'unchecked' },
      { id: 2, name: 'Hide free to play games', check: 'unchecked' },
    ],
    option: [
      { id: 1, name: 'Featured only', check: 'unchecked' },
      { id: 5, name: 'Hide mature items', check: 'unchecked' },
    ],
    tag: [
      { id: 1, name: 'Battle Royal', check: 'unchecked' },
      { id: 2, name: 'Multiplayer', check: 'unchecked' },
      { id: 3, name: 'Martial Arts', check: 'unchecked' },
      { id: 4, name: 'PvP', check: 'unchecked' },
      { id: 5, name: 'Survival', check: 'unchecked' },
      { id: 6, name: 'Shooter', check: 'unchecked' },
      { id: 7, name: 'RPG', check: 'unchecked' },
      { id: 8, name: 'Open World', check: 'unchecked' },
      { id: 9, name: 'Story Rich', check: 'unchecked' },
      { id: 10, name: 'Singleplayer', check: 'unchecked' },
      { id: 11, name: 'Dark', check: 'unchecked' },
      { id: 12, name: 'Fantasy', check: 'unchecked' },
      { id: 13, name: 'Horror', check: 'unchecked' },
      { id: 14, name: 'Difficult', check: 'unchecked' },
      { id: 15, name: 'Action', check: 'unchecked' },
      { id: 16, name: 'Souls-like', check: 'unchecked' },
      // TODO: make it fetch dynamic from backend
    ],
    os: [
      { id: 1, name: 'Windows', check: 'unchecked' },
      { id: 2, name: 'macOS', check: 'unchecked' },
    ],
    publisher: [
      { id: 1, name: 'Publisher 1', check: 'unchecked' },
      { id: 2, name: 'Publisher 2', check: 'unchecked' },
      // TODO: make it fetch dynamic from backend
    ],
    developer: [
      { id: 1, name: 'Developer 1', check: 'unchecked' },
      { id: 2, name: 'Developer 2', check: 'unchecked' },
      // TODO: make it fetch dynamic from backend
    ],
    feature: [
      { id: 1, name: 'Feature 1', check: 'unchecked' },
      { id: 2, name: 'Feature 2', check: 'unchecked' },
      // TODO: make it fetch dynamic from backend
    ],
    language: [
      { id: 1, name: 'Language 1', check: 'unchecked' },
      { id: 2, name: 'Language 2', check: 'unchecked' },
      { id: 3, name: 'Language 3', check: 'unchecked' },
      { id: 4, name: 'Language 4', check: 'unchecked' },
      { id: 5, name: 'Language 5', check: 'unchecked' },
      { id: 6, name: 'Language 6', check: 'unchecked' },
      { id: 7, name: 'Language 7', check: 'unchecked' },
      { id: 8, name: 'Language 8', check: 'unchecked' },
      { id: 9, name: 'Language 9', check: 'unchecked' },
      { id: 10, name: 'Language 10', check: 'unchecked' },
      { id: 11, name: 'Language 11', check: 'unchecked' },
      { id: 12, name: 'Language 12', check: 'unchecked' },
      { id: 13, name: 'Language 13', check: 'unchecked' },
      // TODO: make it fetch dynamic from backend
    ],
  });

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(filters);
  }, [filters, searchParams]);

  const selectOptions: string[] = [
    'Relevance',
    'Release date',
    'Name',
    'Lowest Price',
    'Highest Price',
    'User Reviews',
  ];

  const labels: { label: string; value: number | null }[] = useMemo(
    () => [
      { label: 'Free', value: 0 },
      { label: 'Under $5.00', value: 5 },
      { label: 'Under $10.00', value: 10 },
      { label: 'Under $15.00', value: 15 },
      { label: 'Under $20.00', value: 20 },
      { label: 'Under $25.00', value: 25 },
      { label: 'Under $30.00', value: 30 },
      { label: 'Under $35.00', value: 35 },
      { label: 'Under $40.00', value: 40 },
      { label: 'Under $45.00', value: 45 },
      { label: 'Under $50.00', value: 50 },
      { label: 'Under $55.00', value: 55 },
      { label: 'Under $60.00', value: 60 },
      { label: 'Any Price', value: null },
    ],
    []
  );

  // Add additional filters to options if logged in
  useEffect(() => {
    if (isLoggedIn) {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          option: [
            ...prevFilters.option,
            { id: 2, name: 'Hide items in my library', check: 'unchecked' },
            { id: 3, name: 'Hide items in my wishlist', check: 'unchecked' },
            { id: 4, name: 'Hide items in my cart', check: 'unchecked' },
          ],
        };
      });
    }
  }, [isLoggedIn]);

  const getPriceRangeLabel = useCallback(
    (value: number): string => {
      return labels[value]?.label || '';
    },
    [labels]
  );

  const updateFromURL = useCallback((): void => {
    // Extract and update search term
    const searchTerm: string = searchParams?.get('term') || 'enter search term or tag';
    setSearchValue(decodeURIComponent(searchTerm));
    if (searchTerm !== 'enter search term or tag') {
      setSavedSearchValue(decodeURIComponent(searchTerm));
    }

    // Extract and update sort option
    const sortOption = searchParams?.get('sort') || 'Relevance';
    setSelectedOption(decodeURIComponent(sortOption));

    // Extract and update price range
    const priceValue = searchParams?.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;
    const priceIndex = labels.findIndex((label) => label.value === priceValue);
    setRangeValue(priceIndex);

    // Extract and update checked price options
    const priceOptions =
      searchParams
        ?.get('priceOptions')
        ?.split(',')
        .map((id) => Number(id)) || [];
    setFilters((prevState) => ({
      ...prevState,
      price: prevState.price.map((row) =>
        priceOptions.includes(row.id) ? { ...row, check: 'included' } : row
      ),
    }));

    // Extract and update excluded price options
    const excludedPriceOptions =
      searchParams
        ?.get('excludedPriceOptions')
        ?.split(',')
        .map((id) => Number(id)) || [];
    setFilters((prevState) => ({
      ...prevState,
      price: prevState.price.map((row) =>
        excludedPriceOptions.includes(row.id) ? { ...row, check: 'excluded' } : row
      ),
    }));

    // Extract and update checked tag rows
    const checkedTags =
      searchParams
        ?.get('tags')
        ?.split(',')
        .map((id) => Number(id)) || [];
    setFilters((prevState) => ({
      ...prevState,
      tag: prevState.tag.map((row) =>
        checkedTags.includes(row.id) ? { ...row, check: 'included' } : row
      ),
    }));

    // Extract and update excluded tag rows
    const excludedTags =
      searchParams
        ?.get('excludedTags')
        ?.split(',')
        .map((id) => Number(id)) || [];
    setFilters((prevState) => ({
      ...prevState,
      tag: prevState.tag.map((row) =>
        excludedTags.includes(row.id) ? { ...row, check: 'excluded' } : row
      ),
    }));

    // Extract and update checked feature rows
    const checkedFeatures =
      searchParams
        ?.get('features')
        ?.split(',')
        .map((id) => Number(id)) || [];
    setFilters((prevState) => ({
      ...prevState,
      feature: prevState.feature.map((row) =>
        checkedFeatures.includes(row.id) ? { ...row, check: 'included' } : row
      ),
    }));

    // Extract and update checked developer rows
    const checkedDevelopers =
      searchParams
        ?.get('developers')
        ?.split(',')
        .map((id) => Number(id)) || [];
    setFilters((prevState) => ({
      ...prevState,
      developer: prevState.developer.map((row) =>
        checkedDevelopers.includes(row.id) ? { ...row, check: 'included' } : row
      ),
    }));

    // Extract and update checked publisher rows
    const checkedPublishers =
      searchParams
        ?.get('publishers')
        ?.split(',')
        .map((id) => Number(id)) || [];
    setFilters((prevState) => ({
      ...prevState,
      publisher: prevState.publisher.map((row) =>
        checkedPublishers.includes(row.id) ? { ...row, check: 'included' } : row
      ),
    }));

    // Extract and update checked OS rows
    const checkedOS =
      searchParams
        ?.get('os')
        ?.split(',')
        .map((id) => Number(id)) || [];
    setFilters((prevState) => ({
      ...prevState,
      os: prevState.os.map((row) =>
        checkedOS.includes(row.id) ? { ...row, check: 'included' } : row
      ),
    }));

    // Extract and update checked language rows
    const checkedLanguages =
      searchParams
        ?.get('languages')
        ?.split(',')
        .map((id) => Number(id)) || [];
    setFilters((prevState) => ({
      ...prevState,
      language: prevState.language.map((row) =>
        checkedLanguages.includes(row.id) ? { ...row, check: 'included' } : row
      ),
    }));
  }, [labels, searchParams]);

  useEffect(() => {
    updateFromURL();
  }, [updateFromURL]);

  const constructSearchURL = useCallback((): void => {
    const createQueryString = (key: string, value: string | number | number[]): string => {
      if (Array.isArray(value)) {
        return value.length > 0 ? `${key}=${value.join(',')}` : '';
      }
      return value || value === 0 ? `${key}=${encodeURIComponent(value)}` : '';
    };

    const priceValue = labels[rangeValue].value !== null ? labels[rangeValue].value : '';

    const queryParams = [
      createQueryString('term', savedSearchValue),
      createQueryString('sort', selectedOption),
      createQueryString('maxPrice', priceValue),
      createQueryString(
        'priceOptions',
        filters.price.filter((f) => f.check === 'included').map((f) => f.id)
      ),
      createQueryString(
        'options',
        filters.option.filter((f) => f.check === 'included').map((f) => f.id)
      ),
      createQueryString(
        'tags',
        filters.tag.filter((f) => f.check === 'included').map((f) => f.id)
      ),
      createQueryString(
        'excludedTags',
        filters.tag.filter((f) => f.check === 'excluded').map((f) => f.id)
      ),
      createQueryString(
        'features',
        filters.feature.filter((f) => f.check === 'included').map((f) => f.id)
      ),
      createQueryString(
        'developers',
        filters.developer.filter((f) => f.check === 'included').map((f) => f.id)
      ),
      createQueryString(
        'publishers',
        filters.publisher.filter((f) => f.check === 'included').map((f) => f.id)
      ),
      createQueryString(
        'os',
        filters.os.filter((f) => f.check === 'included').map((f) => f.id)
      ),
      createQueryString(
        'languages',
        filters.language.filter((f) => f.check === 'included').map((f) => f.id)
      ),
    ];

    const baseURL: string = '/search'; // Change to your base URL or path
    const queryString: string = queryParams.filter((param) => param !== '').join('&');
    const fullURL: string = queryString ? `${baseURL}?${queryString}` : baseURL;

    router.replace(fullURL, { scroll: false });

    // Construct request URL
    const requestUrl: URL = new URL(fullURL, 'https://redsteam.com');

    // Handle price options
    requestUrl.searchParams.delete('priceOptions');
    if (filters.price.find((f) => f.id === 1 && f.check === 'included')) {
      requestUrl.searchParams.append('offers', 'true');
    }
    if (filters.price.find((f) => f.id === 2 && f.check === 'included')) {
      requestUrl.searchParams.append('paid', 'true');
    }

    // Handle options
    requestUrl.searchParams.delete('options');
    if (filters.option.find((f) => f.id === 1 && f.check === 'included')) {
      requestUrl.searchParams.append('featured', 'true');
    }
    if (filters.option.find((f) => f.id === 5 && f.check === 'included')) {
      requestUrl.searchParams.append('excludeMature', 'true');
    }

    // Collect all selected platforms and append them as a comma-separated string
    const platforms: string[] = [];
    if (filters.os.find((f) => f.id === 1 && f.check === 'included')) {
      platforms.push('win');
    }
    if (filters.os.find((f) => f.id === 2 && f.check === 'included')) {
      platforms.push('mac');
    }
    if (platforms.length > 0) {
      requestUrl.searchParams.append('platforms', platforms.join(','));
    }

    // Set request parameters
    setRequestParameters(decodeURIComponent(requestUrl.href.split('https://redsteam.com')[1]));
  }, [filters, labels, rangeValue, router, savedSearchValue, selectedOption]);

  useEffect(() => {
    constructSearchURL();
  }, [constructSearchURL, filters]);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearch = (): void => {
    if (searchValue === 'enter search term or tag') {
      setSearchValue('');
    }
  };

  const handleSearchButton = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (searchValue === 'enter search term or tag' || searchValue.trim() === '') {
      setSavedSearchValue('');
    } else {
      setSavedSearchValue(searchValue);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  const handlePriceChange = (value: number): void => {
    setRangeValue(value);
  };

  const updateFilters = (type: string, id: number, check: string): void => {
    setFilters((prevFilters) => {
      const filterTypeKey: keyof FilterState = type as keyof FilterState;
      const updatedFilters: { id: number; name: string; check: string }[] = prevFilters[
        filterTypeKey
      ].map((filter) => (filter.id === id ? { ...filter, check } : filter));
      return { ...prevFilters, [filterTypeKey]: updatedFilters };
    });
  };

  const handleFilterIncludeClick = (filterType: string, row: Filter): void => {
    const newCheck: string = row.check === 'included' ? 'unchecked' : 'included';
    updateFilters(filterType, row.id, newCheck);
  };

  const handleFilterExcludeClick = (
    e: MouseEvent<HTMLImageElement>,
    filterType: string,
    row: Filter
  ): void => {
    e.stopPropagation();
    const newCheck: string = row.check === 'excluded' ? 'unchecked' : 'excluded';
    updateFilters(filterType, row.id, newCheck);
  };

  const handleFilterDelete = (filterType: keyof FilterState, id: number): void => {
    setFilters((prevFilters) => {
      const updatedFilters: { id: number; name: string; check: string }[] = prevFilters[
        filterType
      ].map((filter) => (filter.id === id ? { ...filter, check: 'unchecked' } : filter));
      return { ...prevFilters, [filterType]: updatedFilters };
    });
  };

  const handleSearchDeleteFilter = (): void => {
    setSearchValue('enter search term or tag');
    setSavedSearchValue('');
  };

  const searchRight: JSX.Element = (
    <SearchRight
      rangeValue={rangeValue}
      setRangeValue={setRangeValue}
      handlePriceChange={handlePriceChange}
      handlePriceRowClick={(row) => handleFilterIncludeClick('price', row)}
      handleOptionRowClick={(row) => handleFilterIncludeClick('option', row)}
      handleTagRowClick={(row) => handleFilterIncludeClick('tag', row)}
      handleTagRowExcludeClick={(e, row) => handleFilterExcludeClick(e, 'tag', row)}
      handleFeatureRowClick={(row) => handleFilterIncludeClick('feature', row)}
      handleDeveloperRowClick={(row) => handleFilterIncludeClick('developer', row)}
      handlePublisherRowClick={(row) => handleFilterIncludeClick('publisher', row)}
      handleOSRowClick={(row) => handleFilterIncludeClick('os', row)}
      handleLanguageRowClick={(row) => handleFilterIncludeClick('language', row)}
      getPriceRangeLabel={getPriceRangeLabel}
      filters={filters}
      isViewport960={isViewport960}
    />
  );

  const searchLeft: JSX.Element = (
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
      hideLibrary={!!filters.option.find((f) => f.id === 2 && f.check === 'included')}
      hideWishlist={!!filters.option.find((f) => f.id === 3 && f.check === 'included')}
      hideCart={!!filters.option.find((f) => f.id === 4 && f.check === 'included')}
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
          {Object.values(filters)
            .flat()
            .filter((row) => row.check !== 'unchecked').length === 0 && savedSearchValue === '' ? (
            <div className="search-title">All Products</div>
          ) : (
            <>
              {savedSearchValue !== '' && (
                <div className="search-tag">
                  {savedSearchValue}
                  <a onClick={handleSearchDeleteFilter} />
                </div>
              )}
              {Object.values(filters)
                .flat()
                .map(
                  (row: Filter) =>
                    row.check === 'included' && (
                      <div className="search-tag" key={row.name}>
                        {row.name}
                        <a onClick={() => handleFilterDelete('tag', row.id)} />
                      </div>
                    )
                )}
              {Object.values(filters)
                .flat()
                .map(
                  (row: Filter) =>
                    row.check === 'excluded' && (
                      <div className="search-tag excluded" key={row.name}>
                        <Image src={searchCrouton} alt="excluded" />
                        {row.name}
                        <a onClick={() => handleFilterDelete('tag', row.id)} />
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

export default SearchPage;
