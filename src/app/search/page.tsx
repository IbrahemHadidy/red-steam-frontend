'use client';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';
import useReplaceUrl from '@hooks/useReplaceUrl';
import useResponsiveViewport from '@hooks/useResponsiveViewport';
import useInitializeSearch from './_hooks/useInitializeSearch';

// Constants
import { DEFAULT_BG } from '@config/constants/backgrounds';

// Components
import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import SecondNavbar from '@components/SecondNavbar/SecondNavbar';
import CurrentFilters from './_CurrentFilters/CurrentFilters';
import SearchLeft from './_SearchLeft/SearchLeft';
import SearchRight from './_SearchRight/SearchRight';

export default function SearchPage() {
  //--------------------------- Initializations ---------------------------//
  const isViewport960OrLess = useResponsiveViewport(960);

  //------------------------------- States --------------------------------//
  const { searchUrl } = useAppSelector((state) => state.search);

  //------------------------------- Hooks ---------------------------------//
  useInitializeSearch();
  useReplaceUrl(searchUrl);

  //------------------------------- Render --------------------------------//
  useDynamicBackground(DEFAULT_BG);
  return (
    <>
      {isViewport960OrLess && <SearchRight />}

      <Header />

      <div className="search-header">
        <SecondNavbar />
        <CurrentFilters />
      </div>

      <div className="s-page-content">
        <form id="search-form" className="search-form">
          <SearchLeft />
          {!isViewport960OrLess && <SearchRight />}
        </form>
      </div>

      <Footer />
    </>
  );
}
