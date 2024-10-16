'use client';

// React
import { useMemo, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { addToWishlist, removeFromWishlist } from '@services/user/interaction';

// Images
import selectedIcon from '@images/ico_selected.png';

// Types
import type { JSX } from 'react';
import type { QueueAreaProps } from '../MediaAndSummary.types';

export default function QueueArea({ game, isViewport630 }: QueueAreaProps): JSX.Element {
  // Init
  const router = useRouter();
  const dispatch = useAppDispatch();

  // States
  const { isUserLoggedIn, currentUserData } = useAppSelector((state) => state.auth);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(
    !!currentUserData?.wishlist?.some((item) => item.id === game.id)
  );

  // Refs
  const addedWislist = useRef<HTMLDivElement>(null);

  const [isInLibrary, isInCart]: [boolean | undefined, boolean | undefined] = useMemo(
    () => [
      currentUserData?.library?.some((item) => item.id === game.id),
      currentUserData?.cart?.some((item) => item.id === game.id),
    ],
    [currentUserData, game.id]
  );

  const handleRemoveFromWishlist = async (itemId: number): Promise<void> => {
    if (addedWislist.current) {
      addedWislist.current.classList.add('loading');
      addedWislist.current.style.pointerEvents = 'none';
      const response = await removeFromWishlist([itemId]);
      if (response?.status === 200) {
        await dispatch(fetchUserData());
        setIsAddedToWishlist(false);
      }
      addedWislist.current.classList.remove('loading');
      addedWislist.current.style.pointerEvents = 'auto';
    }
  };

  const handleAddToWishlist = async (itemId: number): Promise<void> => {
    if (addedWislist.current) {
      addedWislist.current.classList.add('loading');
      addedWislist.current.style.pointerEvents = 'none';
      const response = await addToWishlist([itemId]);
      if (response?.status === 201) {
        await dispatch(fetchUserData());
        setIsAddedToWishlist(true);
      }
      addedWislist.current.classList.remove('loading');
      addedWislist.current.style.pointerEvents = 'auto';
    }
  };

  const handleAddWishlistBtnClick = (): void => {
    if (isInLibrary) {
      router.push('/library');
    } else if (isInCart) {
      router.push('/cart');
    } else {
      handleAddToWishlist(game.id);
    }
  };

  const handleAddedWishlistBtnClick = (): void => {
    handleRemoveFromWishlist(game.id);
  };

  const handleFollowClick = (): void => {
    toast.warn('Community features are not yet supported');
  };

  const handleIgnoreClick = (): void => {
    toast.warn('Not implemented yet');
  };

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
          {!isViewport630 && (
            <div className="view-queue-button">
              <span>
                View Your Queue&nbsp;&nbsp;&nbsp;
                <i className="arrow-next" />
              </span>
            </div>
          )}

          {!isAddedToWishlist ? (
            <div
              id="add-wishlist"
              className="queue-button-container"
              onClick={handleAddWishlistBtnClick}
              ref={addedWislist}
            >
              <div className="queue-button">
                <span>
                  {isInLibrary
                    ? 'You own this item '
                    : isInCart
                      ? 'Already in your cart'
                      : 'Add to your wishlist'}
                </span>
              </div>
            </div>
          ) : (
            <div
              id="added-wishlist"
              className="queue-button-container"
              onClick={handleAddedWishlistBtnClick}
              ref={addedWislist}
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
