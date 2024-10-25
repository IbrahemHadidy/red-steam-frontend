import { Game } from '@interfaces/game';

interface CheckoutItemProps {
  game: Game;
}

export default function CheckoutItem({ game }: CheckoutItemProps) {
  return (
    <div className="review-checkout-item">
      <div className="checkout-item-img">
        <img src={game.thumbnailEntries.searchImage} alt={game.name} />
      </div>

      <div className="checkout-item-price">
        <div>${game.pricing?.price ?? 'unknown'} USD</div>
      </div>

      <div className="checkout-item-desc">
        <div className="checkout-item-platform">
          {game.platformEntries.win && <span className="platform-img win" />}
          {game.platformEntries.mac && <span className="platform-img mac" />}
        </div>
        &nbsp;{game.name}
      </div>
    </div>
  );
}
