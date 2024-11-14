// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Components
import LeftContent from './LeftContent/LeftContent';
import RightContent from './RightContent/RightContent';

// Skeletons
import Skeleton from './Skeleton';

export default function GameContent() {
  //-------------------------------- States -------------------------------//
  const { currentGame, isGameFetching } = useAppSelector((state) => state.game);

  //--------------------------- Render UI Section -------------------------//
  if (isGameFetching || !currentGame) {
    return <Skeleton />;
  } else {
    return (
      <div className="page-content game-content">
        <RightContent />
        <LeftContent />
      </div>
    );
  }
}
