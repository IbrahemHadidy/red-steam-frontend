// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { setIsGameModalOpen, setSelectedGame } from '@store/features/shop/library/librarySlice';

// Types
import type { Game } from '@entities/game.entity';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  // Init
  const dispatch = useAppDispatch();

  // States
  const { cardSize } = useAppSelector((state) => state.library);

  // Event Handlers
  const handleCardClick = (game: Game): void => {
    dispatch(setSelectedGame(game));
    dispatch(setIsGameModalOpen(true));
  };

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
