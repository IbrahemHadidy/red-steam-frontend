'use client';

// React
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';
import SearchLeft from './_SearchLeft/SearchLeft';
import SearchRight from './_SearchRight/SearchRight';

// Contexts
import { AuthContext } from '@contexts/AuthContext';

// Services
import { getAllDevelopers } from '@services/common/developers';
import { getAllFeatures } from '@services/common/features';
import { getAllLanguages } from '@services/common/languages';
import { getAllPublishers } from '@services/common/publishers';
import { getAllTags } from '@services/common/tags';
import { getByParameters } from '@services/game/data';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import debounce from '@utils/debounce';
import Decimal from 'decimal.js';

// Images
import searchCrouton from '@images/search_crouton_not.svg';

// Types
import type { Game } from '@entities/game.entity';
import type { ChangeEvent, FC, JSX, MouseEvent } from 'react';
import type { Filter, FilterState, RequestParams } from './Search.types';

const SearchPage: FC = (): JSX.Element => {
  // Init
  const router = useRouter();
  const searchParams = useSearchParams();
  const isViewport960 = useResponsiveViewport(960);

  // Contexts
  const { isLoggedIn, userData } = useContext(AuthContext);

  // States
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('Relevance');
  const [searchValue, setSearchValue] = useState<string>('enter game name');
  const [savedSearchValue, setSavedSearchValue] = useState<string>('');
  const [rangeValue, setRangeValue] = useState<number>(13);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterState>({
    price: [
      { id: 1, name: 'Special Offers', check: 'unchecked' },
      { id: 2, name: 'Hide free to play games', check: 'unchecked' },
    ],
    preference: [
      { id: 1, name: 'Featured only', check: 'unchecked' },
      { id: 6, name: 'Exclude mature', check: 'unchecked' },
      { id: 7, name: 'Exclude upcoming', check: 'unchecked' },
    ],
    tag: [],
    os: [
      { id: 1, name: 'Windows', check: 'unchecked' },
      { id: 2, name: 'macOS', check: 'unchecked' },
    ],
    publisher: [],
    developer: [],
    feature: [],
    language: [],
  });
  const [isFiltersFetched, setIsFiltersFetched] = useState<boolean>(false);
  const [requestParameters, setRequestParameters] = useState<RequestParams>({
    searchData: {},
    pagination: { offset: 0, limit: 20 },
  });
  const [fetchedGames, setFetchedGames] = useState<Game[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Get filters functions
  useEffect(() => {
    const fetchFilters = async () => {
      const [tags, features, publishers, developers, languages] = await Promise.all([
        getAllTags(),
        getAllFeatures(),
        getAllPublishers(),
        getAllDevelopers(),
        getAllLanguages(),
      ]);

      setFilters((prevFilters) => ({
        ...prevFilters,
        tag: tags.map((tag) => ({ id: tag.id, name: tag.name, check: 'unchecked' })),
        feature: features.map((feature) => ({
          id: feature.id,
          name: feature.name,
          check: 'unchecked',
        })),
        publisher: publishers.map((publisher) => ({
          id: publisher.id,
          name: publisher.name,
          check: 'unchecked',
        })),
        developer: developers.map((developer) => ({
          id: developer.id,
          name: developer.name,
          check: 'unchecked',
        })),
        language: languages.map((language) => ({
          id: language.id,
          name: language.name,
          check: 'unchecked',
        })),
      }));

      setIsFiltersFetched(true);
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const wishlistFilter = filters.preference.find((f) => f.name === 'Hide items in my wishlist');
    const cartFilter = filters.preference.find((f) => f.name === 'Hide items in my cart');
    const libraryFilter = filters.preference.find((f) => f.name === 'Hide items in my library');
    if (isLoggedIn && !wishlistFilter && !cartFilter && !libraryFilter) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        preference: [
          ...prevFilters.preference,
          { id: 2, name: 'Hide items in my library', check: 'unchecked' },
          { id: 3, name: 'Hide items in my wishlist', check: 'unchecked' },
          { id: 4, name: 'Hide items in my cart', check: 'unchecked' },
        ],
      }));
    }
  }, [isLoggedIn, filters.preference]);

  // Select options
  const selectOptions: string[] = [
    'Relevance',
    'Release Date',
    'Name',
    'Lowest Price',
    'Highest Price',
    'User Reviews',
    'Top Sales',
  ];

  // Price range
  const ranges: { label: string; value: number | null }[] = useMemo(
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

  const getPriceRangeLabel = useCallback(
    (value: number): string => {
      return ranges[value]?.label || '';
    },
    [ranges]
  );

  // Set `Hide free to play games` to unchecked if price range is set to `Free`
  useEffect(() => {
    if (rangeValue === 0) {
      setFilters((prevState) => ({
        ...prevState,
        price: prevState.price.map((row) => ({
          ...row,
          check: row.id === 2 ? 'unchecked' : row.check,
        })),
      }));
    }
  }, [rangeValue]);

  const updateFromURL = useCallback((): void => {
    if (isFiltersFetched) {
      // Extract and update search term
      const searchTerm: string = searchParams?.get('term') || 'enter game name';
      setSearchValue(decodeURIComponent(searchTerm));
      if (searchTerm !== 'enter game name') {
        setSavedSearchValue(decodeURIComponent(searchTerm));
      }

      // Extract and update sort option
      const sortOption = searchParams?.get('sort') || 'Relevance';
      setSortOption(decodeURIComponent(sortOption));

      // Extract and update price range
      const priceValue = searchParams?.get('maxPrice')
        ? Number(searchParams.get('maxPrice'))
        : null;
      const priceIndex = ranges.findIndex((range) => range.value === priceValue);
      setRangeValue(priceIndex);

      // Reusable function to update filter rows
      const updateFilter = (
        key:
          | 'priceOptions'
          | 'preferenceOptions'
          | 'tags'
          | 'excludedTags'
          | 'features'
          | 'developers'
          | 'publishers'
          | 'os'
          | 'languages', // the searchParams key
        field: keyof FilterState, // the field to update in the filter state
        status: 'included' | 'excluded' // the status to set for the check property
      ) => {
        const options =
          searchParams
            ?.get(key)
            ?.split(',')
            .map((id) => Number(id)) || [];

        setFilters((prevState) => ({
          ...prevState,
          [field]: prevState[field].map((row) =>
            options.includes(row.id) ? { ...row, check: status } : row
          ),
        }));
      };

      // Update included price options
      updateFilter('priceOptions', 'price', 'included');

      // Update included preference options
      updateFilter('preferenceOptions', 'preference', 'included');

      // Update included and excluded tag rows
      updateFilter('tags', 'tag', 'included');
      updateFilter('excludedTags', 'tag', 'excluded');

      // Update included feature rows
      updateFilter('features', 'feature', 'included');

      // Update included developer rows
      updateFilter('developers', 'developer', 'included');

      // Update included publisher rows
      updateFilter('publishers', 'publisher', 'included');

      // Update included OS rows
      updateFilter('os', 'os', 'included');

      // Update included language rows
      updateFilter('languages', 'language', 'included');
    }
  }, [isFiltersFetched, ranges, searchParams]);

  useEffect(() => {
    updateFromURL();
  }, [updateFromURL]);

  const constructSearchURL = useCallback((): void => {
    if (isFiltersFetched) {
      // Reusable function to create query string
      const createQueryString = (key: string, value: string | number | number[]): string => {
        if (Array.isArray(value)) {
          return value.length > 0 ? `${key}=${value.join(',')}` : '';
        }
        return value || value === 0 ? `${key}=${encodeURIComponent(value)}` : '';
      };

      const priceValue = ranges[rangeValue].value !== null ? ranges[rangeValue].value : '';

      const queryParams = [
        createQueryString('term', savedSearchValue),
        createQueryString('sort', sortOption),
        createQueryString('maxPrice', priceValue),
        createQueryString(
          'priceOptions',
          filters.price.filter((f) => f.check === 'included').map((f) => f.id)
        ),
        createQueryString(
          'preferenceOptions',
          filters.preference.filter((f) => f.check === 'included').map((f) => f.id)
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
    }
  }, [
    filters.developer,
    filters.feature,
    filters.language,
    filters.os,
    filters.preference,
    filters.price,
    filters.publisher,
    filters.tag,
    isFiltersFetched,
    rangeValue,
    ranges,
    router,
    savedSearchValue,
    sortOption,
  ]);

  // Construct search parameters
  useEffect(() => {
    const searchData: RequestParams['searchData'] = {};

    // Get saved search value
    if (savedSearchValue) {
      searchData.partialName = savedSearchValue;
    }

    // Get sort option
    if (sortOption === 'Relevance') {
      searchData.sort = 'relevance';
    } else if (sortOption === 'Name') {
      searchData.sort = 'name';
    } else if (sortOption === 'Lowest Price') {
      searchData.sort = 'lowestPrice';
    } else if (sortOption === 'Highest Price') {
      searchData.sort = 'highestPrice';
    } else if (sortOption === 'Release Date') {
      searchData.sort = 'releaseDate';
    } else if (sortOption === 'User Reviews') {
      searchData.sort = 'reviews';
    } else if (sortOption === 'Top Sales') {
      searchData.sort = 'totalSales';
    }

    // Get price range
    if (ranges[rangeValue].value !== null) {
      searchData.maxPrice = new Decimal(ranges[rangeValue].value).toDecimalPlaces(2).toString();
    }

    // Get tags
    if (filters.tag.filter((f) => f.check === 'included').length > 0) {
      searchData.tags = filters.tag.filter((f) => f.check === 'included').map((f) => f.id);
    }

    // Get excluded tags
    if (filters.tag.filter((f) => f.check === 'excluded').length > 0) {
      searchData.excludeTags = filters.tag.filter((f) => f.check === 'excluded').map((f) => f.id);
    }

    // Get paid only
    if (
      filters.price.filter((f) => f.name === 'Hide free to play games' && f.check === 'included')
        .length > 0
    ) {
      searchData.paid = true;
    }

    // Get offers only
    if (
      filters.price.filter((f) => f.name === 'Special Offers' && f.check === 'included').length > 0
    ) {
      searchData.offers = true;
    }

    // Get platforms
    if (filters.os.filter((f) => f.check === 'included').length > 0) {
      const platforms = filters.os.filter((f) => f.check === 'included').map((f) => f.name);
      const convertedPlatforms: ('win' | 'mac')[] = platforms
        .map((platform) => {
          if (platform === 'macOS') {
            return 'mac';
          }
          if (platform === 'Windows') {
            return 'win';
          }
        })
        .filter((platform) => platform !== undefined);

      searchData.platforms = convertedPlatforms;
    }

    // Get publishers
    if (filters.publisher.filter((f) => f.check === 'included').length > 0) {
      searchData.publishers = filters.publisher
        .filter((f) => f.check === 'included')
        .map((f) => f.id);
    }

    // Get developers
    if (filters.developer.filter((f) => f.check === 'included').length > 0) {
      searchData.developers = filters.developer
        .filter((f) => f.check === 'included')
        .map((f) => f.id);
    }

    // Get features
    if (filters.feature.filter((f) => f.check === 'included').length > 0) {
      searchData.features = filters.feature.filter((f) => f.check === 'included').map((f) => f.id);
    }

    // Get languages
    if (filters.language.filter((f) => f.check === 'included').length > 0) {
      searchData.languages = filters.language
        .filter((f) => f.check === 'included')
        .map((f) => f.id);
    }

    // Get featured only
    if (
      filters.preference.filter((f) => f.name === 'Featured only' && f.check === 'included')
        .length > 0
    ) {
      searchData.featured = true;
    }

    // Get exclude mature
    if (
      filters.preference.filter((f) => f.name === 'Exclude mature' && f.check === 'included')
        .length > 0
    ) {
      searchData.excludeMature = true;
    }

    // Get exclude upcoming
    if (
      filters.preference.filter(
        (f) => f.name === 'Exclude upcoming games' && f.check === 'included'
      ).length > 0
    ) {
      searchData.upcomingMode = 'exclude';
    }

    // Get excluded games ids
    if (userData) {
      const newExcludedIds: Set<number> = new Set();

      const wishlistFilter = filters.preference.find((f) => f.name === 'Hide items in my wishlist');
      const cartFilter = filters.preference.find((f) => f.name === 'Hide items in my cart');
      const libraryFilter = filters.preference.find((f) => f.name === 'Hide items in my library');

      if (wishlistFilter && wishlistFilter.check === 'included') {
        userData.wishlist.forEach((item) => newExcludedIds.add(item.id));
      }
      if (cartFilter && cartFilter.check === 'included') {
        userData.cart.forEach((item) => newExcludedIds.add(item.id));
      }
      if (libraryFilter && libraryFilter.check === 'included') {
        userData.library.forEach((item) => newExcludedIds.add(item.id));
      }

      // Update searchData with the newly computed excluded game IDs.
      searchData.excludedGames = Array.from(newExcludedIds);
    }

    setRequestParameters((prevState) => ({
      ...prevState,
      searchData: searchData,
    }));
  }, [
    filters.developer,
    filters.feature,
    filters.language,
    filters.os,
    filters.preference,
    filters.price,
    filters.publisher,
    filters.tag,
    rangeValue,
    ranges,
    savedSearchValue,
    sortOption,
    userData,
  ]);

  // Handle filter updates
  useEffect(() => {
    constructSearchURL();
  }, [constructSearchURL]);

  const fetchGamesData = useCallback(
    async (addToEnd = false): Promise<void> => {
      const response = await getByParameters(
        requestParameters.searchData,
        requestParameters.pagination
      );

      if (response.length === 0) {
        setHasMore(false);
      }

      // Add new games to the current list, avoiding duplicates
      if (addToEnd) {
        setFetchedGames((prevGames) =>
          prevGames.concat(
            response.filter((newGame) => !prevGames.some((prevGame) => prevGame.id === newGame.id))
          )
        );
      } else {
        setFetchedGames(response);
      }
      setDisabled(false);
    },
    [requestParameters.pagination, requestParameters.searchData]
  );

  const debouncedFetchGamesData = useMemo(
    () => debounce<() => void>(fetchGamesData, 500),
    [fetchGamesData]
  );

  // Fetch data from API when filters change
  useEffect(() => {
    setDisabled(true);
    debouncedFetchGamesData();

    return () => {
      debouncedFetchGamesData.cancel();
    };
  }, [debouncedFetchGamesData]);

  // Reset pagination when filters change
  useEffect(() => {
    setRequestParameters((prevState) => ({
      ...prevState,
      pagination: {
        limit: 20,
        offset: 0,
      },
    }));
  }, [filters]);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string): void => {
    setSortOption(option);
    setIsOpen(false);
  };

  const handleSearch = (): void => {
    if (searchValue === 'enter game name') {
      setSearchValue('');
    }
  };

  const handleSearchButton = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (searchValue === 'enter game name' || searchValue.trim() === '') {
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

  const handleFilterDelete = useCallback((filterType: keyof FilterState, id: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].map((filter) =>
        filter.id === id ? { ...filter, check: 'unchecked' } : filter
      ),
    }));
  }, []);

  const handleSearchDeleteFilter = (): void => {
    setSearchValue('enter game name');
    setSavedSearchValue('');
  };

  const searchRight: JSX.Element = (
    <SearchRight
      rangeValue={rangeValue}
      setRangeValue={setRangeValue}
      handlePriceChange={handlePriceChange}
      handlePriceRowClick={(row) => handleFilterIncludeClick('price', row)}
      handleOptionRowClick={(row) => handleFilterIncludeClick('preference', row)}
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
      sortOption={sortOption}
      hasMore={hasMore}
      setRequestParameters={setRequestParameters}
      fetchGamesData={fetchGamesData}
      isOpen={isOpen}
      selectOptions={selectOptions}
      selectOption={selectOption}
      inputRef={inputRef}
      searchValue={searchValue}
      handleSearch={handleSearch}
      handleInputChange={handleInputChange}
      handleSearchButton={handleSearchButton}
      fetchedGames={fetchedGames}
      disabled={disabled}
      isViewport960={isViewport960}
    />
  );

  return (
    <>
      {isViewport960 && searchRight}
      <Header />
      <div className="search-header">
        <SecondNavbar />
        <div
          className="page-content"
          style={{ marginTop: '20px', paddingLeft: '2px' }}
          ref={contentRef}
        >
          {Object.values(filters)
            .flat()
            .filter((row) => row.check !== 'unchecked').length === 0 && savedSearchValue === '' ? (
            <div className="search-title">All Products</div>
          ) : (
            <>
              {savedSearchValue !== '' && (
                <div className="search-filter">
                  {savedSearchValue}
                  <a onClick={handleSearchDeleteFilter} />
                </div>
              )}
              {Object.entries(filters).flatMap(([filterType, filterArray]) =>
                filterArray.map((row: Filter) =>
                  row.check === 'included' ? (
                    <div className="search-filter" key={`${filterType}-${row.id}-include`}>
                      {row.name}
                      <a
                        onClick={() => handleFilterDelete(filterType as keyof FilterState, row.id)}
                      />
                    </div>
                  ) : null
                )
              )}
              {Object.entries(filters).flatMap(([filterType, filterArray]) =>
                filterArray.map((row: Filter) =>
                  row.check === 'excluded' ? (
                    <div className="search-filter excluded" key={`${filterType}-${row.id}-exclude`}>
                      <Image src={searchCrouton} alt="excluded" />
                      {row.name}
                      <a
                        onClick={() => handleFilterDelete(filterType as keyof FilterState, row.id)}
                      />
                    </div>
                  ) : null
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
