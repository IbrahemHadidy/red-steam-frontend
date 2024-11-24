// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Utils
import getPlatform from '@utils/getPlatform';

// Components
import GamePurchase from '../GamePurchase/GamePurchase';
import About from './About';
import Legal from './Legal';
import Mature from './Mature';
import SystemRequirements from './SystemRequirements';

export default function LeftContent() {
  //--------------------------- Initializations ---------------------------//
  const platform = getPlatform();
  const isViewport630OrLess = useResponsiveViewport(630);

  //------------------------------- States --------------------------------//
  const { currentGame } = useAppSelector((state) => state.game);

  //------------------------------- Render --------------------------------//
  return (
    <div className="game-content-left">
      {!isViewport630OrLess && <GamePurchase />}

      <About />

      {currentGame?.mature && <Mature />}

      {platform !== 'darwin' && <SystemRequirements />}

      {currentGame?.legal && <Legal />}
    </div>
  );
}
