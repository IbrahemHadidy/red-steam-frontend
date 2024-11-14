'use client';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { addToWishlist, removeFromWishlist } from '@store/features/game/gameThunks';

// Custom Hooks
import useResponsiveViewport from '@hooks/useResponsiveViewport';

// Skeleton
import LoadingSkeleton from './Skeleton';

// Images
import selectedIcon from '@images/ico_selected.png';

export default function QueueArea() {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isViewport630OrLess = useResponsiveViewport(630);

  //------------------------------- States --------------------------------//
  const { isUserLoggedIn, authOnLoadIntialized, isAuthInitialized } = useAppSelector(
    (state) => state.auth
  );
  const { currentGame, isGameInWishlist, isGameInLibrary, isGameInCart, isWishlistBtnLoading } =
    useAppSelector((state) => state.game);

  //---------------------------- Event Handlers ---------------------------//
  const handleAddToWishlist = async (): Promise<void> => {
    await dispatch(addToWishlist());
  };

  const handleRemoveFromWishlist = async (): Promise<void> => {
    await dispatch(removeFromWishlist());
  };

  const handleAddWishlistBtnClick = (): void => {
    if (isGameInLibrary) {
      router.push('/library');
    } else if (isGameInCart) {
      router.push('/cart');
    } else if (currentGame) {
      handleAddToWishlist();
    }
  };

  const handleFollowClick = (): void => {
    toast.warn('Community features are not yet supported');
  };

  const handleIgnoreClick = (): void => {
    toast.warn('Not implemented yet');
  };

  //-------------------------- Render UI Section --------------------------//
  if (!authOnLoadIntialized || !isAuthInitialized) {
    return <LoadingSkeleton />;
  } else {
    return (
      <div className="queue-area">
        {!isUserLoggedIn && (
          <div className="queue-actions">
            <Link href="/login">Sign in</Link> to add this item to your wishlist, follow it, or mark
            it as ignored
          </div>
        )}

        {isUserLoggedIn && (
          <div className="queue-actions">
            {!isViewport630OrLess && (
              <div className="view-queue-button">
                <span>
                  View Your Queue&nbsp;&nbsp;&nbsp;
                  <i className="arrow-next" />
                </span>
              </div>
            )}

            {!isGameInWishlist ? (
              <div
                id="add-wishlist"
                className={`queue-button-container ${isWishlistBtnLoading ? 'loading' : ''}`}
                onClick={handleAddWishlistBtnClick}
              >
                <div className="queue-button">
                  <span>
                    {isGameInLibrary
                      ? 'You own this item '
                      : isGameInCart
                        ? 'Already in your cart'
                        : 'Add to your wishlist'}
                  </span>
                </div>
              </div>
            ) : (
              <div
                id="added-wishlist"
                className={`queue-button-container ${isWishlistBtnLoading ? 'loading' : ''}`}
                onClick={handleRemoveFromWishlist}
              >
                <div className="queue-button">
                  <span>
                    <Image src={selectedIcon} alt="selected" /> On Wishlist
                  </span>
                </div>
              </div>
            )}
            <div id="follow" className="queue-button-container">
              {/* TODO: isFollowed backend logic */}
              <div
                className="queue-button"
                style={{ display: 'inline-block' }}
                onClick={handleFollowClick}
              >
                <span>Follow</span>
              </div>
              {/* !isFollowed */}
              <div className="queue-button" style={{ display: 'none' }}>
                <span>
                  <Image src={selectedIcon} alt="selected" /> Following
                </span>
              </div>
            </div>

            {/* TODO: isNotIgnored backend logic */}
            <div
              id="ignore"
              className="queue-button-container"
              style={{ display: 'inline-block' }}
              onClick={handleIgnoreClick}
            >
              <div className="queue-button">
                <span>Ignore</span>
              </div>
            </div>

            {/* !isNotIgnored */}
            <div id="ignored" className="queue-button-container" style={{ display: 'none' }}>
              <div className="queue-button">
                <span>
                  <Image src={selectedIcon} alt="selected" /> Ignored
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
