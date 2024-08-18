'use client';

// React
import { useContext, useMemo, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { addToWishlist, removeFromWishlist } from 'services/user/interaction';

// Images
import selectedIcon from 'images/ico_selected.png';

// Types
import type { FC, JSX } from 'react';
import type { QueueAreaProps } from '../MediaAndSummary.types';

export const QueueArea: FC<QueueAreaProps> = ({ game, isViewport630 }): JSX.Element => {
  // Init
  const router = useRouter();

  // Contexts
  const { isLoggedIn, userData, fetchData } = useContext(AuthContext);

  // States
  const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(
    !!userData?.wishlist?.some((item) => item.id === game.id)
  );

  // Refs
  const addedWislist = useRef<HTMLDivElement>(null);

  const [isInLibrary, isInCart]: [boolean | undefined, boolean | undefined] = useMemo(
    () => [
      userData?.library?.some((item) => item.id === game.id),
      userData?.cart?.some((item) => item.id === game.id),
    ],
    [userData, game.id]
  );

  const handleRemoveFromWishlist = async (itemId: number): Promise<void> => {
    if (addedWislist.current) {
      addedWislist.current.classList.add('loading');
      addedWislist.current.style.pointerEvents = 'none';
      const response = await removeFromWishlist([itemId]);
      if (response?.status === 200) {
        fetchData();
        setIsAddedToWishlist(false);
      } else {
        toast.error('An error occurred. Please try again later.');
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
      if (response?.status === 200) {
        fetchData();
        setIsAddedToWishlist(true);
      } else {
        toast.error('An error occurred. Please try again later.');
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
      {!isLoggedIn && (
        <div className="queue-actions">
          <Link href="/login">Sign in</Link> to add this item to your wishlist, follow it, or mark
          it as ignored
        </div>
      )}

      {isLoggedIn && (
        <div className="queue-actions">
          {!isViewport630 && (
            <a className="view-queue-button" href="">
              <span>
                View Your Queue&nbsp;&nbsp;&nbsp;
                <i className="arrow-next" />
              </span>
            </a>
          )}

          {!isAddedToWishlist ? (
            <div
              id="add-wishlist"
              className="queue-button-container"
              onClick={handleAddWishlistBtnClick}
            >
              <a className="queue-button" href="">
                <span>
                  {isInLibrary
                    ? 'You own this item '
                    : isInCart
                      ? 'Already in your cart'
                      : 'Add to your wishlist'}
                </span>
              </a>
            </div>
          ) : (
            <div
              id="added-wishlist"
              ref={addedWislist}
              className="queue-button-container"
              onClick={handleAddedWishlistBtnClick}
            >
              <a className="queue-button" href="">
                <span>
                  <Image src={selectedIcon} alt="selected" /> On Wishlist
                </span>
              </a>
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
};
