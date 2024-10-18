// React
import { Suspense } from 'react';

// NextJS
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Actions
import { setHoveredItemIndex } from '@store/features/shop/wishlist/wishlistSlice';

// Redux Thunks
import { removeFromWishlist } from '@store/features/shop/wishlist/wishlistThunks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Components
const DiscountActions = dynamic(() => import('./DiscountActions'));
const NoDiscountActions = dynamic(() => import('./NoDiscountActions'));

// Utils
import formatDate from '@utils/formatDate';
import { getRatingClass, getRatingText } from '@utils/ratingUtils';

// Types
import type { Game } from '@entities/game.entity';

interface WishlistItemProps {
  game: Game;
  idx: number;
}

export default function WishlistItem({ game, idx }: WishlistItemProps) {
  // Init
  const dispatch = useAppDispatch();
  const isViewport960 = useResponsiveViewport(960);

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { hoveredItemIndex, isRemoveBtnLoading } = useAppSelector((state) => state.wishlist);

  // Event Handlers
  const handleCapsuleMouseEnter = (idx: number): void => {
    dispatch(setHoveredItemIndex(idx));
  };

  const handleCapsuleMouseLeave = (): void => {
    dispatch(setHoveredItemIndex(null));
  };

  const handleRemoveBtnClick = async (itemId: number): Promise<void> => {
    await dispatch(removeFromWishlist(itemId));
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-row">
        {!isViewport960 && (
          <Link
            className="capsule"
            href={`/game/${game?.id}`}
            onMouseEnter={() => handleCapsuleMouseEnter(idx)}
            onMouseLeave={handleCapsuleMouseLeave}
          >
            <img src={game?.thumbnailEntries.horizontalHeaderImage} alt="game-header" />
            <div className="screenshots" style={{ opacity: hoveredItemIndex === idx ? '1' : '0' }}>
              {game?.imageEntries.map((item, idx) => (
                <div key={idx * 100} style={{ backgroundImage: `url(${item.link})` }} />
              ))}
            </div>
          </Link>
        )}

        <div className="content">
          <Link href={`/game/${game?.id}`} className="wishlist-title">
            {' '}
            {game?.name}{' '}
          </Link>

          <div className="mid-container">
            {!isViewport960 && (
              <div className="stats">
                <div className="label">Overall Reviews:</div>
                <div className={`value game-review-summary ${getRatingClass(game.averageRating)}`}>
                  {getRatingText(game.averageRating, game.reviewsCount)}
                  &nbsp;
                </div>
                <div className="label">Release Date:</div>
                <div className="value">{formatDate(game?.releaseDate)}</div>
              </div>
            )}
            <div className="purchase-container">
              <div className="purchase-area">
                <Suspense fallback={<div>Loading...</div>}>
                  {!game?.pricing?.discount ? (
                    <NoDiscountActions game={game} />
                  ) : (
                    <DiscountActions game={game} />
                  )}
                </Suspense>
              </div>
            </div>
          </div>

          <div className="lower-container">
            <div className="platform-icons">
              {game?.platformEntries.win && <span className="platform-img win" />}
              {game?.platformEntries.mac && <span className="platform-img mac" />}
            </div>
            <div className="lower-columns">
              <div className="tags">
                {game?.tags?.map((tag) => (
                  <Link href={`/search?tags=${tag.id}`} key={tag.id} className="tag">
                    <p>{tag.name}</p>
                  </Link>
                ))}
              </div>
              {currentUserData?.wishlist[idx] && currentUserData?.wishlist[idx].addedOn ? (
                <div className="added-on">
                  Added on&nbsp;
                  {formatDate(currentUserData?.wishlist[idx].addedOn)}
                  &nbsp;(&nbsp;
                  <div
                    className={`delete ${isRemoveBtnLoading ? 'loading' : ''}`}
                    onClick={() => handleRemoveBtnClick(game?.id)}
                  >
                    remove
                  </div>
                  &nbsp;)
                </div>
              ) : (
                <div className="added-on">No date available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
