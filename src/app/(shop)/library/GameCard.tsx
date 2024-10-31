// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setIsGameModalOpen, setSelectedGame } from '@store/features/shop/library/librarySlice';

// Types
import type { Game } from '@interfaces/game';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { cardSize } = useAppSelector((state) => state.shop.library);

  //---------------------------- Event Handlers ----------------------------//
  const handleCardClick = (game: Game): void => {
    dispatch(setSelectedGame(game));
    dispatch(setIsGameModalOpen(true));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <div
      className="game-card"
      key={game.id}
      style={{
        backgroundImage: `url(${game.thumbnailEntries.horizontalHeaderImage})`,
        width: `${cardSize}px`,
        height: `calc(${cardSize}px * 215 / 460)`,
      }}
      onClick={() => handleCardClick(game)}
    >
      <div className="overlay">
        <h1 style={{ fontSize: `${Math.max(10, cardSize / 20)}px` }}>{game.name}</h1>
      </div>
    </div>
  );
}
