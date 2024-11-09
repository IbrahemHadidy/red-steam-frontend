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
  const isViewport630 = useResponsiveViewport(630);
  const isViewport960 = useResponsiveViewport(960);

  //-------------------------- Render UI Section --------------------------//
  return (
    <>
      {isViewport630 && <GamePurchase />}

      {isViewport630 ? (
        <div className="game-content-right">
          <RecommendationReasons />
          <GameFeatures />
          <SupportedLanguages />
          <GameDetails />
        </div>
      ) : isViewport960 ? (
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
