// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Components
import GamePurchase from '../GamePurchase/GamePurchase';
import GameDetails from './GameDetails';
import GameFeatures from './GameFeatures';
import RecommendationReasons from './RecommendationReasons';
import SupportedLanguages from './SupportedLanguages';

export default function RightContent() {
  //--------------------------- Initializations ---------------------------//
  const isViewport630OrLess = useResponsiveViewport(630);
  const isViewport960OrLess = useResponsiveViewport(960);

  //------------------------------- Render --------------------------------//
  return (
    <>
      {isViewport630OrLess && <GamePurchase />}

      {isViewport630OrLess ? (
        <div className="game-content-right">
          <RecommendationReasons />
          <GameFeatures />
          <SupportedLanguages />
          <GameDetails />
        </div>
      ) : isViewport960OrLess ? (
        <div className="mobile-right-content">
          <div className="game-content-right">
            <GameFeatures />
            <SupportedLanguages />
          </div>
          <div className="game-content-right">
            <RecommendationReasons />
            <GameDetails />
          </div>
        </div>
      ) : (
        <div className="game-content-right">
          <RecommendationReasons />
          <GameFeatures />
          <SupportedLanguages />
          <GameDetails />
        </div>
      )}
    </>
  );
}
